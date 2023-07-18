from django import forms
from django.core import validators
from django.core.validators import FileExtensionValidator

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

class UploadFileForm(forms.Form):
    upload_files = MultiFileField(
        min_num=1,
        max_num=10,
        max_file_size=1024*1024*5,  # 5 MB
    )

    #        validators=[FileExtensionValidator(allowed_extensions=["jsonl"])]