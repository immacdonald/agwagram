from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.http import HttpResponseRedirect
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect

from .code import bloc_handler

from .forms import UsernameSearchForm

import logging
logger = logging.getLogger("mainLogger")

from datetime import datetime

def main(request):
    return render(request, 'main.html')

def analyze(request):
    form = UsernameSearchForm()
    return render(request, 'analyze.html', {'form': form})

def methodology(request):
    return render(request, 'methodology.html')

def analysis_results(request):
    form = UsernameSearchForm(request.POST or None)
    print('Valid form?', form.is_valid())
    if not form.is_valid():
        return render(request, 'analyze.html', {'form': form})

    username = form.cleaned_data['username']
    results = bloc_handler.analyze_user(username)

    if results['user_exists']:
        # Output formatting
        for word in results['top_bloc_words']:
            word['term_rate'] = "{:.3f}".format(word["term_rate"], 3)

        initial_date_format = '%Y-%m-%d %H:%M:%S'
        output_date_format = '%m/%d/%Y'

        context = {
            # User Data
            "username" : username, 
            "account_name": results['account_name'],
            # BLOC Statistics
            'tweet_count': results['tweet_count'],
            'first_tweet_date': datetime.strptime(results['first_tweet_date'], initial_date_format).strftime(output_date_format),
            'last_tweet_date': datetime.strptime(results['last_tweet_date'], initial_date_format).strftime(output_date_format),
            'elapsed_time': round(results['elapsed_time'], 3),
            # Analysis
            "bloc_action": results['bloc_action'].replace(' ', '&nbsp;'),
            "bloc_content_syntactic": results['bloc_content_syntactic'].replace(' ', '&nbsp;'),
            "bloc_content_semantic": results['bloc_content_semantic'].replace(' ', '&nbsp;'),
            "top_bloc_words": results['top_bloc_words'][:10]
        }
        return render(request, 'analysis_results.html', context)
    
    else:
        context = {
            # User Data
            "username" : username, 
            'error_title': results['error_title'],
            'error_detail': results['error_detail']
        }
        return render(request, 'analysis_failed.html', context)