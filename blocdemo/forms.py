from django import forms

class UsernameSearchForm(forms.Form):
   username = forms.CharField(max_length = 24)