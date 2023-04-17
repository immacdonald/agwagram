from argparse import Namespace

from datetime import datetime

def link_data(tweets):
    linked_data = []
    for tweet in tweets:
        date_obj = datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S %z %Y')

        # Format datetime object as desired
        formatted_date = date_obj.strftime('%B %d, %Y @ %I:%M%p').replace(' 0', ' ')

        data = {
            "created_at": formatted_date,
            "action": tweet['bloc']['bloc_sequences_short']['action'],
            "content_syntactic": tweet['bloc']['bloc_sequences_short']['content_syntactic'][1:-1],
            "content_semantic_entity": tweet['bloc']['bloc_sequences_short']['content_semantic_entity'][1:-1],
            "content_semantic_sentiment": tweet['bloc']['bloc_sequences_short']['content_semantic_sentiment'],
            "change": tweet['bloc']['bloc_sequences_short']['change']
        }
        linked_data.append(data)
    print(linked_data)
    
    return linked_data

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
        'keep_tweets': True, 
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