from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import json
from .serializers import *
from .code import bloc_handler
from .code import symbols
from .code.file_handling import handle_uploaded_file, extract_tweets_from_files, validate_tweet_data
from django.http import JsonResponse


import logging
logger = logging.getLogger("mainLogger")


class MainView(TemplateView):
    template_name = 'main.html'


class Ping(APIView):
    def get(self, request):
        return Response({"response": 'BLOC Services are fully operational.'}, status=status.HTTP_200_OK)


import time
class AnalyzeFiles(APIView):
    def post(self, request):
        start: float = time.perf_counter()
        change_param = request.query_params.get('change_report', 'true')
        generate_change_report = change_param.lower() == 'true'

        try:
            tic = time.perf_counter()
            tweet_files = request.FILES.getlist('tweet_files')

            converted_files = []
            for file in tweet_files:
                converted_file = handle_uploaded_file(file)
                if converted_file is None:
                    return Response({"error": "Invalid file(s) uploaded."}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
                converted_files.append(converted_file.name)

            if len(converted_files) == 0:
                return Response({"error": "Invalid file(s) uploaded."}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

            toc = time.perf_counter()
            print(f"Converted all files in {toc - tic:0.4f} seconds")

            tweets = extract_tweets_from_files(files=converted_files)
            if tweets is None:
                return Response({"error": "Invalid file(s) uploaded."}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
            
            if validate_tweet_data(tweets=tweets) is False:
                return Response({"error": "Invalid tweet data, file is missing fields."}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
            
            results = bloc_handler.analyze_tweets(tweets=tweets, change_report=generate_change_report)

            for temp_file in converted_files:
                os.remove(temp_file)

            end = time.perf_counter()
            print(f"Processed file in {end - start:0.4f} seconds")
            return Response(results, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return Response({"error": "An error occurred processing your request."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AnalyzeUsers(APIView):
    def post(self, request):
        # Use request.data for POST requests
        serializer = AnalyzeUserSerializer(data=request.data)  
        if serializer.is_valid():
            try:
                # Access the username from validated data
                results = bloc_handler.analyze_user(serializer.validated_data['username'])
                return Response(results, status=status.HTTP_200_OK)
            except Exception as error:
                return Response({"error": f"{error}"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Invalid username data."}, status=status.HTTP_400_BAD_REQUEST)


class GetSymbols(APIView):
    def get(self, request):
        try:
            response = json.dumps(symbols.get_all_symbols())
            return JsonResponse(symbols.get_all_symbols())
        except Exception as error:
            return Response({"error": f"{error}"}, status=status.HTTP_400_BAD_REQUEST)