import json
import gzip
import os
import tempfile
import time
import sys

def genericErrorInfo(slug=''):
    exc_type, exc_obj, exc_tb = sys.exc_info()
    fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    
    errMsg = fname + ', ' + str(exc_tb.tb_lineno)  + ', ' + str(sys.exc_info())
    print(errMsg + slug)

    return errMsg
####

def getDictArrayFromJsonl(file):
    data = []

    with open(file, 'r') as jsonl_file:
        jsonl_list = list(jsonl_file)

    for obj in jsonl_list:
        result = json.loads(obj)
        data.append(result)
    return data

def getDictArrayFromJson(file):
    data = []
    with open(file, 'r') as json_file:
        data = json.load(json_file)
    
    return data

def getDictArrayFromFile(file):
    file_type = os.path.splitext(file)[1]
    print('file:', file)

    if file_type == '.gz':
        uncompressed_file = os.path.splitext(file)[0]
        with gzip.open(file, 'rb') as gz_file:
            with open(uncompressed_file, 'wb') as write_file:
                write_file.write(gz_file.read())

        # Determine the file type of the uncompressed file
        file_type = os.path.splitext(uncompressed_file)[1]
        file=uncompressed_file
    
    if file_type == '.json':
        return getDictArrayFromJson(file)
    elif file_type == '.jsonl':
        return getDictArrayFromJsonl(file)
    else:
        return None

  
# Use for View functions for converting uploaded files into accessible files
def handle_uploaded_file(file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=file.name) as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)

    
    return temp_file

def extract_tweets_from_files(files = None):
    if(files):
        start_file = time.perf_counter()
        tweets = []
        for file in files:
            
            file_contents = getDictArrayFromFile(file)
            if file_contents is None:
                return None
            
            tweets.extend(file_contents)
        end_file = time.perf_counter()
        print(f"Got tweets list in {end_file - start_file:0.4f} seconds")
        return tweets
    else:
        return None
    
def validate_tweet_data(tweets = None):
    if(tweets):
        # Define the required top-level fields
        required_fields = {
            "id", "full_text", "user", "in_reply_to_status_id", "created_at", "entities"
        }

        # Define required user sub-fields
        required_user_fields = {
            "id", "screen_name"
        }

        # Define required entity sub-fields
        required_entity_fields = {"user_mentions", "hashtags", "symbols", "urls"}
        
        for tweet in tweets:
            # Check if all top-level fields are present
            if not required_fields <= tweet.keys():
                missing = required_fields - tweet.keys()
                print(f"Missing top-level fields: {missing}")
                return False
        
            
            # Check user sub-fields
            user = tweet["user"]
            if not required_user_fields <= user.keys():
                missing = required_user_fields - user.keys()
                print(f"Missing user fields: {missing}")
                return False
        
            '''
            # Check entity sub-fields
            entities = tweet["entities"]
            if not required_entity_fields <= entities.keys():
                missing = required_entity_fields - entities.keys()
                print(f"Missing entity fields: {missing}")
                return False
            '''
        
        return True
    
    else:
        return False