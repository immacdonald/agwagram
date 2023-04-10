from django.conf import settings

import osometweet

from argparse import Namespace
from bloc.generator import gen_bloc_for_users
from bloc.subcommands import run_subcommands

def verify_user_exists(user_list):
    oauth2 = osometweet.OAuth2(bearer_token=settings.BEARER_TOKEN, manage_rate_limits=False)
    ot = osometweet.OsomeTweet(oauth2)

    # Returns dict list with 'id' 'name' and 'username' fields
    user_data = ot.user_lookup_usernames(user_list)

    #print('User data', user_data)

    if(user_data.get('errors')):
        error_details = {
            'errors': []
        }
        for error in user_data['errors']:
            error_details['errors'].append({
                'account_username': error['value'],
                'error_title': error['title'],
                # Remove the brackets from the account error detail around the username
                'error_detail': error['detail'].replace("[", "").replace("]", "")
            })
        return len(error_details['errors']), error_details

    return 0, user_data['data']


def analyze_user(usernames):
    usernames = usernames.replace(',', ' ').split()
    print(usernames)

    # Remove duplicate usernames while maintaining order
    unique_usernames = set()
    usernames = [u for u in usernames if not (u in unique_usernames or unique_usernames.add(u))]

    error_count, user_data = verify_user_exists(usernames)
    #print('User data is', user_data)

    if error_count > 0:
        result = {
            'successful_generation': False,
            'query': usernames,
            'errors': user_data['errors']
        }

    else:
        user_ids = [ user['id'] for user in user_data ]
        gen_bloc_params, gen_bloc_args = get_bloc_params(user_ids, settings.BEARER_TOKEN, bloc_alphabets=['action', 'content_syntactic', 'content_semantic_entity'])
        bloc_payload = gen_bloc_for_users(**gen_bloc_params)

        all_bloc_output = bloc_payload.get('all_users_bloc', [])

        # Useful statistics
        query_count = len(usernames)
        total_tweets = sum([ user_bloc['more_details']['total_tweets'] for user_bloc in all_bloc_output ])

        # Get the top BLOC words per account
        top_bloc_words = run_subcommands(gen_bloc_args, 'top_ngrams', all_bloc_output)
        user_bloc_words = {}
        if total_tweets > 0:
            for words, user in zip(top_bloc_words['per_doc'], top_bloc_words['users']):
                user_bloc_words[user] = words
        # Get the top BLOC words for all acounts and sort by frequency
        group_bloc_words = top_bloc_words.get('all_docs', [])
        if group_bloc_words:
            group_bloc_words = sorted(group_bloc_words, key=lambda x: x['term_freq'], reverse=True)
        
        # Generate and sort the pairwise comparisons
        pairwise_sim_report = run_subcommands(gen_bloc_args, 'sim', all_bloc_output)
        pairwise_sim_report = sorted(pairwise_sim_report, key=lambda x: x['sim'], reverse=True)

        result = {
            'successful_generation': True,
            'query_count': query_count,
            'total_tweets': total_tweets,
            'account_blocs': [],
            'group_top_bloc_words': group_bloc_words,
            'pairwise_sim': pairwise_sim_report
        }

        for account_bloc, account_data in zip(all_bloc_output, user_data):
            bloc_words = user_bloc_words.get(account_data['username'], [])

            result['account_blocs'].append({
                'user_exists': True,
                # User Data
                'account_name': account_data['name'],
                'account_username': account_data['username'],
                # BLOC Statistics
                'tweet_count': account_bloc['more_details']['total_tweets'],
                'first_tweet_date': account_bloc['more_details']['first_tweet_created_at_local_time'],
                'last_tweet_date': account_bloc['more_details']['last_tweet_created_at_local_time'],
                'elapsed_time': account_bloc['elapsed_time']['gen_tweets_total_seconds'] + account_bloc['elapsed_time']['gen_bloc_total_seconds'],
                # Analysis
                'bloc_action': account_bloc['bloc']['action'],
                'bloc_content_syntactic': account_bloc['bloc']['content_syntactic'],
                'bloc_content_semantic': account_bloc['bloc']['content_semantic_entity'],
                'top_bloc_words': bloc_words
            })

    return result



def get_bloc_params(user_ids, bearer_token, token_pattern='word', no_screen_name=True, account_src='Twitter search', no_sleep=True, max_pages=1, max_results=100, bloc_alphabets = ['action', 'content_syntactic']):
    #bloc_alphabets = ['action', 'change', 'content_syntactic', 'content_semantic_entity', 'content_semantic_sentiment']
    params = {
        'screen_names_or_ids': user_ids, 
        'bearer_token': bearer_token, 
        'account_src': account_src,
        'account_class': '',
        'access_token': '', 'access_token_secret': '', 'consumer_key': '', 'consumer_secret': '', 
        'blank_mark': 60, 'minute_mark': 5, 'segmentation_type': 'week_number', 'days_segment_count': -1, 
        'ansi_code': '91m', 
        'bloc_alphabets': bloc_alphabets, 'bloc_symbols_file': None, 
        'cache_path': '', 'cache_read': False, 'cache_write': False, 
        'following_lookup': False, 
        'keep_tweets': False, 
        'keep_bloc_segments': False, 
        'log_file': '', 'log_format': '', 'log_level': 'INFO', 'log_dets': {'level': 20},
        'max_pages': max_pages, 'max_results': max_results, 
        'no_screen_name': no_screen_name, 'no_sleep': no_sleep, 
        'output': None, 
        'timeline_startdate': '', 'timeline_scroll_by_hours': None, 'time_function': 'f2', 
        'subcommand': '', 

        'fold_start_count': 4,
        'keep_tf_matrix': False,
        'ngram': 1 if token_pattern == 'word' else 2,
        'sort_action_words': False,#
        'set_top_ngrams': False,
        'tf_matrix_norm': '',
        'token_pattern': token_pattern,
        'top_ngrams_add_all_docs': False,
        'sim_no_summary': True,
        'tweet_order': 'reverse'
    }

    return params, Namespace(**params)