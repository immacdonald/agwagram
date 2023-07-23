from django.shortcuts import render

from .code import bloc_handler
from .code import symbols
from .code.django_counter import DjangoCounter
from .code.file_handling import handle_uploaded_file

from datetime import datetime

from .forms import UsernameSearchForm, UploadFileForm

from django.views import View
from django.views.generic import TemplateView
from django.views.generic.edit import FormView
from django.urls import reverse_lazy
from django.shortcuts import redirect
import os

import logging
logger = logging.getLogger("mainLogger")


class MainView(TemplateView):
    template_name = 'main.html'


class MethodologyView(TemplateView):
    template_name = 'methodology.html'


class AnalyzeUser(FormView):
    form_class = UsernameSearchForm
    template_name = 'analyze_user.html'
    success_url = reverse_lazy('results')

    def form_valid(self, form):
        username = form.cleaned_data['username']
        self.request.session['results'] = bloc_handler.analyze_user(username)
        return redirect(self.get_success_url())
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['previous_results'] = 'results' in self.request.session
        return context
    
class AnalyzeFile(FormView):
    form_class = UploadFileForm
    template_name = 'analyze_file.html'
    enctype = 'multipart/form-data'
    success_url = reverse_lazy('results')

    def form_valid(self, form):
        tweet_files = self.request.FILES.getlist('tweet_files')

        # Use tempfiles to convert the uploaded file to ones that can be accessed intuitively
        converted_files = []
        for file in tweet_files:
            converted_file = handle_uploaded_file(file)
            converted_files.append(converted_file.name)

        results = bloc_handler.analyze_tweet_file(converted_files)

        for temp_file in converted_files:
            os.remove(temp_file)

        self.request.session['results'] = results

        return redirect(self.get_success_url())
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['previous_results'] = 'results' in self.request.session
        return context


class AnalysisResultsView(View):
    def get(self, request):
        results = request.session.get('results')
        if results is None:
            # Handle the case when 'results' is not available in the session
            return render(request, 'analysis_failed.html', {"errors": "No results found."})

        if results['successful_generation']:
            if results['query_count'] > 1:
                for u_pair in results['pairwise_sim']:
                    u_pair['sim'] = f'{float(u_pair["sim"]):.1%}'

                context = {
                    'total_tweets': results['total_tweets'],
                    'account_blocs': [],
                    'group_top_bloc_words': results['group_top_bloc_words'],
                    "group_top_actions": results['group_top_actions'],
                    "group_top_syntactic": results['group_top_syntactic'],
                    "group_top_semantic": results['group_top_semantic'],
                    "group_top_sentiment": results['group_top_sentiment'],
                    "group_top_time": results['group_top_time'],
                    'pairwise_sim': results['pairwise_sim'][:10],
                    'bloc_symbols': symbols.get_all_symbols()
                }

                for account in results['account_blocs']:
                    account_data = format_account_data(account)
                    context['account_blocs'].append(account_data)

                return render(request, 'analysis_results.html', context)
            else:
                context = {
                    'account': format_account_data(results['account_blocs'][0])
                }

                return render(request, 'analysis_results_single.html', context)
        else:
            context = {
                # User Data
                "query": results['query'],
                "errors": results['errors']
            }
            return render(request, 'analysis_failed.html', context)


def format_account_data(account):
    # Output formatting
    initial_date_format = '%Y-%m-%d %H:%M:%S'
    output_date_format = '%m/%d/%Y'

    first_tweet_date = last_tweet_data = ''
    if account['first_tweet_date'] != '':
        first_tweet_date = datetime.strptime(account['first_tweet_date'], initial_date_format).strftime(output_date_format)
    if account['last_tweet_date'] != '':
        last_tweet_data = datetime.strptime(account['last_tweet_date'], initial_date_format).strftime(output_date_format)

    output_data = {
        # User Data
        "account_username": account['account_username'],
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
        "top_bloc_words": account['top_bloc_words'],
        "top_actions": account['top_actions'],
        "top_syntactic": account['top_syntactic'],
        "top_semantic": account['top_semantic'],
        "top_sentiment": account['top_sentiment'],
        "top_time": account['top_time'],
        # Linked Data
        'linked_data': account['linked_data'],
        'counter': DjangoCounter()
    }

    return output_data


def process_bloc_string(bloc):
    return bloc.replace(' ', '').replace('|', '')
    

from rest_framework.views import APIView
from rest_framework.response import Response

class Analyze(APIView):
    def post(self, request):
        # Assuming the data is sent in JSON format
        try:
            # Get the value from the POST data
            data = request.data.get('user')
            
            # Process the data and return the response
            if data is not None:
                result = "Received value: " + data
                return Response({"result": result})
            else:
                return Response({"error": "Invalid data. 'value' parameter not found."}, status=400)

        except Exception as e:
            return Response({"error": "An error occurred: " + str(e)}, status=500)
