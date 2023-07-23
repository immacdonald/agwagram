from django import forms
from django.core import validators
from django.core.exceptions import ValidationError
import os

from multiupload.fields import MultiFileField

class UsernameSearchForm(forms.Form):
    usernameValidator = validators.RegexValidator(
        regex=r'^[\w]{1,15}(,\s*[\w]{1,15})*(\s+[\w]{1,15}(,\s*[\w]{1,15})*)*$',
        message='Usernames must contain only letters, numbers, or underscores, and be between 1 and 15 characters seperated by commas or spaces'
    )
    username = forms.CharField(
        label='Search by Username:',
        validators=[usernameValidator],
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'OSoMe_IU, POTUS'})
    )

 
def validate_tweet_files(value):
    for file in value:
        #print(os.path.splitext(file.name)[1])
        if os.path.splitext(file.name)[1] == '.jsonl' or os.path.splitext(file.name)[1] == '.json' or os.path.splitext(file.name)[1] == '.gz':
            return
        raise ValidationError("Not a valid JSON, JSONL, or Gzip file.")
        

class UploadFileForm(forms.Form):
    tweet_files = MultiFileField(
        required=True,
        min_num=1,
        max_num=10,
        max_file_size=1024*1024*10,
        validators=[validate_tweet_files]
    )
