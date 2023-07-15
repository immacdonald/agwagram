from django import forms
from django.core import validators
from django.core.validators import FileExtensionValidator

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
    upload_file = forms.FileField(validators=[FileExtensionValidator(allowed_extensions=["gz"])]);