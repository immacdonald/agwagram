from django import forms
from django.core import validators

class UsernameSearchForm(forms.Form):
   username = forms.CharField(max_length = 15, 
                              label = 'Search by Username:', 
                              validators=[validators.RegexValidator(
                                    regex=r'^[A-Za-z0-9_]{1,15}$',
                                    message='Username must contain only letters, numbers, or underscores, and be between 1 and 15 characters long'
                                 )],
                              required = True, 
                              widget=forms.TextInput(attrs={'placeholder': 'OSoMe_IU'}))