from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.http import HttpResponseRedirect
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect

from .code import bloc_handler
from .code import bloc_symbols
from .code.django_counter import DjangoCounter
from .code.django_counter import DjangoCounter

from .forms import UsernameSearchForm

import logging
logger = logging.getLogger("mainLogger")

from datetime import datetime

def main(request):
    return render(request, 'pages/main.html')

def analyze(request, form_data = None):
    if request.method == "POST":
        form = UsernameSearchForm(request.POST or None)
        if form.is_valid():
            username = form.cleaned_data['username']
            return analysis_results(request, username)
    else:
        form = UsernameSearchForm(form_data)

    return render(request, 'pages/analyze.html', {'form': form})

def methodology(request):
    return render(request, 'pages/methodology.html')

def analysis_results(request, usernames):
    results = bloc_handler.analyze_user(usernames)
    #print(results)

    if results['successful_generation']:
        if(results['query_count'] > 1):
            for word in results['group_top_bloc_words']:
                word['term_rate'] = "{:.3f}".format(float(word["term_rate"]), 3)

            for u_pair in results['pairwise_sim']:
                u_pair['sim'] = "{:.4f}".format(float(u_pair["sim"]), 4)

            context = {
                'total_tweets': results['total_tweets'],
                'account_blocs': [],
                'group_top_bloc_words': results['group_top_bloc_words'],
                'pairwise_sim': results['pairwise_sim'][:10],
                'bloc_symbols': bloc_symbols.get_all_symbols()
            }

            for account in results['account_blocs']:
                account_data = format_account_data(account)
                context['account_blocs'].append(account_data)
            
            #print(context)
            return render(request, 'pages/analysis_results.html', context)
        else:
            context = {
                'account': format_account_data(results['account_blocs'][0])
            }

            return render(request, 'pages/analysis_results_single.html', context) 

    
    else:
        context = {
            # User Data
            "query" : results['query'], 
            "errors": results['errors']
        }
        return render(request, 'pages/analysis_failed.html', context)
    

def format_account_data(account):
    # Output formatting
    for word in account['top_bloc_words']:
        word['term_rate'] = "{:.3f}".format(float(word["term_rate"]), 3)

    initial_date_format = '%Y-%m-%d %H:%M:%S'
    output_date_format = '%m/%d/%Y'

    first_tweet_date = last_tweet_data = ''
    if account['first_tweet_date'] != '':
        first_tweet_date = datetime.strptime(account['first_tweet_date'], initial_date_format).strftime(output_date_format)
    if account['last_tweet_date'] != '':    
        last_tweet_data = datetime.strptime(account['last_tweet_date'], initial_date_format).strftime(output_date_format)

    output_data = {
        # User Data
        "account_username" : account['account_username'], 
        "account_name": account['account_name'],
        # BLOC Statistics
        'tweet_count': account['tweet_count'],
        'first_tweet_date': first_tweet_date,
        'last_tweet_date': last_tweet_data,
        'elapsed_time': round(account['elapsed_time'], 3),
        # Analysis
        "bloc_action": process_bloc_string(account['bloc_action']),
        "bloc_syntactic": process_bloc_string(account['bloc_syntactic']),
        "bloc_semantic_entity": process_bloc_string(account['bloc_semantic_entity']),
        "bloc_semantic_sentiment": process_bloc_string(account['bloc_semantic_sentiment']),
        "bloc_change": process_bloc_string(account['bloc_change']),
        "top_bloc_words": account['top_bloc_words'],#[:10],
        # Linked Data
        'linked_data': account['linked_data'],
        'counter': DjangoCounter()
    }

    return output_data

def process_bloc_string(bloc):
    #return bloc.replace(' ', '&nbsp;')
    return bloc.replace(' ', '').replace('|', '')
    #return bloc