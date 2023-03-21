from bloc.generator import add_bloc_sequences
from bloc.generator import gen_bloc_for_users
from bloc.util import get_default_symbols
from django.conf import settings

def get_bloc(screen_name):
    user_bloc = gen_bloc_for_users([screen_name], settings.BEARER_TOKEN, '', '', '', '')
    #all_bloc_symbols = get_default_symbols()
    #print(user_bloc)
    return user_bloc
    #osome_iu_bloc = add_bloc_sequences(osome_iu_tweets_lst, all_bloc_symbols=all_bloc_symbols, bloc_alphabets= ['action', 'content_syntactic'])
