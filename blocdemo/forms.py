from django import forms
from django.core import validators

class UsernameSearchForm(forms.Form):
   username = forms.CharField(label = 'Search by Username:', 
                              validators=[validators.RegexValidator(
                                    #regex=r'^[A-Za-z0-9_]{1,15}$',
                                    regex=r'^[\w]{1,15}(,\s*[\w]{1,15})*(\s+[\w]{1,15}(,\s*[\w]{1,15})*)*$',
                                    message='Usernames must contain only letters, numbers, or underscores, and be between 1 and 15 characters seperated by commas or spaces'
                                 )],
                              required = True, 
                              widget=forms.TextInput(attrs={'placeholder': 'OSoMe_IU, POTUS'}))