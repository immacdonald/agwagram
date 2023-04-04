from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.http import HttpResponseRedirect
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect

from .code import bloc_handler

from .forms import UsernameSearchForm

import logging
logger = logging.getLogger("mainLogger")

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

    context = {
        # User Data
        "username" : username, 
        "account_name": results['account_name'],
        # BLOC Statistics
        'tweet_count': results['tweet_count'],
        'first_tweet_date': results['first_tweet_date'],
        'last_tweet_date': results['last_tweet_date'],
        'elapsed_time': results['elapsed_time'],
        # Analysis
        # Analysis
        "bloc_action": results['bloc_action'].replace(' ', '&nbsp;'),
        "bloc_content_syntactic": results['bloc_content_syntactic'].replace(' ', '&nbsp;'),
        "bloc_content_semantic": results['bloc_content_semantic'].replace(' ', '&nbsp;')
    }
    return render(request, 'analysis_results.html', context)