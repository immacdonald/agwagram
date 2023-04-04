from django import forms

class UsernameSearchForm(forms.Form):
   username = forms.CharField(max_length = 24, label = 'Search by Username:', widget=forms.TextInput(attrs={'placeholder': 'OSoMe_IU'}))