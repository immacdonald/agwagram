# BLOC Website

## About
This website is being developed for Dr. Nwala as a web interface for his novel BLOC methodology for analyzing online accounts to discover coordinated actions, bots, and other behaviours. More information about the underlying BLOC algorithm can be found on his [BLOC GitHub](https://github.com/anwala/bloc).

## Installation
The BLOC Demo website (tentatively referred to as **B<sup>3</sup>T**) is built using a Django back-end and therefore requires some initialization before use. To start, as per best practices according to the [Django Getting Started Guide](https://docs.djangoproject.com/en/4.1/topics/install/), create a new virtual environment for the project. Using the provided `requirements.txt`file, install the listed Python libraries into said virtual environment by using `pip3 install -r requirements.txt`.

## Local Operation
Clone the repository and make sure to activate your virtual environment. To use the BLOC features, a valid set of Twitter Developer credentials must be configured in the project. Currently, these are read in using a `.env` file located in the `blocproject` folder that needs to be created locally and supplied with a value for `BEARER_TOKEN`. 

To start the server, run `python3 manage.py runserver` from inside the `bloc_website` folder. The website is then accessible at the URL `http://localhost:8000/blocdemo/`. 
