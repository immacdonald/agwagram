# BLOC Website

## Installation
The BLOC Demo website (tentatively referred to as **B<sup>3</sup>T**) is built using a Django back-end and therefore requires some initialization before use. To start, as per best practices according to the [Django Getting Started Guide](https://docs.djangoproject.com/en/4.1/topics/install/), create a new virtual environment for the project. Install the following Python libraries into said virtual environment: `django`, `twitterbloc`, `python-dotenv`, and `django-bootstrap-v5`.

## Local Operation
Clone the repository and make sure to activate your virtual environment. To use the BLOC features, a valid set of Twitter Developer credentials must be configured in the project. Currently, these are read in using a `.env` file located in the `blocproject` folder that needs to be created locally and supplied with a value for `BEARER_TOKEN`. 

To start the server, run `python3 manage.py runserver` from inside the `bloc_website` folder. The website is then accessible at the URL `http://localhost:8000/blocdemo/`. 
