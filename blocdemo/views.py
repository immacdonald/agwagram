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
    # Default search for OSoMe_IU
    username = "Invalid Search"
   
    if request.method == "POST":
        #Get the posted form
        usernameInputForm = UsernameSearchForm(request.POST)
      
        if usernameInputForm.is_valid():
            username = usernameInputForm.cleaned_data['username']
    else:
        usernameInputForm = UsernameSearchForm()
        return redirect('main')

    results = bloc_handler.analyze_user(username)

    top_bloc_words = []
    for word in results['top_bloc_words']:
        term_results = f'Term: {word["term"]}, Frequency: {word["term_freq"]}, Rate: {"{:.3f}".format(word["term_rate"], 3)}'
        top_bloc_words.append(term_results)

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
        "top_bloc_words": top_bloc_words[:10]
    }
    return render(request, 'analysis_results.html', context)