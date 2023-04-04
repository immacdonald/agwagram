from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.http import HttpResponseRedirect
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect

from .code import bloc_handler

from .forms import UsernameSearchForm

def main(request):
    return render(request, 'main.html')

def analyze(request):
    form = UsernameSearchForm()
    return render(request, 'analyze.html', {'form': form})

def methodology(request):
    return render(request, 'methodology.html')

def analysis_results(request):
    # Default search for OSoMe_IU
    username = "Invalid Search"
   
    if request.method == "POST":
        #Get the posted form
        usernameInputForm = UsernameSearchForm(request.POST)
      
        if usernameInputForm.is_valid():
            username = usernameInputForm.cleaned_data['username']
    else:
        usernameInputForm = UsernameSearchForm()
        return redirect('main')

    #BLOC Result is a list containing dictionaries, the content evaluation is at index 0
    bloc_result = bloc_handler.get_bloc(username)
    context = {
        "username" : username, 
        "bloc_action": bloc_result[0]['bloc']['action'].replace(' ', '&nbsp;'),
        "bloc_content_syntactic": bloc_result[0]['bloc']['content_syntactic'].replace(' ', '&nbsp;'),
        "bloc_content_semantic": bloc_result[0]['bloc']['content_semantic_entity'].replace(' ', '&nbsp;')
    }
    return render(request, 'analysis_results.html', context)