from bloc.generator import add_bloc_sequences
from bloc.util import getDictFromJsonGZ
from bloc.util import get_default_symbols

from argparse import Namespace

import os

def get_bloc_params(token_pattern='word', no_screen_name=True,
                    no_sleep=True, max_pages=1, max_results=100,
                    bloc_alphabets=['action', 'content_syntactic']):
    params = {
        'account_class': '',
        'access_token': '', 'access_token_secret': '', 'consumer_key': '', 'consumer_secret': '',
        'blank_mark': 60, 'minute_mark': 5, 'segmentation_type': 'week_number', 'days_segment_count': -1,
        'ansi_code': '91m',
        'bloc_alphabets': bloc_alphabets, 
        'bloc_symbols_file': None,
        'cache_path': '', 'cache_read': False,
        'cache_write': False,
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
        'sort_action_words': False,
        'set_top_ngrams': False,
        'tf_matrix_norm': '',
        'token_pattern': token_pattern,
        'top_ngrams_add_all_docs': False,
        'sim_no_summary': True,
        'tweet_order': 'noop'
    }

    return params, Namespace(**params)


def get_bloc_data():
    path = os.path.dirname(os.path.abspath(__file__))
    user_tweets = getDictFromJsonGZ(os.path.join(path, 'sample_raw_tweets_1.json.gz'))

    gen_bloc_params, gen_bloc_args = get_bloc_params(bloc_alphabets=['action', 'content_syntactic', 'content_semantic_entity', 'content_semantic_sentiment', 'change'])
    
    all_bloc_symbols = get_default_symbols()

    u_bloc = add_bloc_sequences(user_tweets, all_bloc_symbols=all_bloc_symbols, **gen_bloc_params)

    return u_bloc