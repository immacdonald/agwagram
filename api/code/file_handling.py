import json
import gzip
import os
import tempfile


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

  
# Use for View functions for converting uploaded files into accessible files
def handle_uploaded_file(file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=file.name) as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)

    
    return temp_file