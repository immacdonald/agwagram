# BLOC Website

## About
This website is being developed for Dr. Nwala as a web interface for his novel BLOC methodology for analyzing online accounts to discover coordinated actions, bots, and other behaviours. More information about the underlying BLOC algorithm can be found on his [BLOC GitHub](https://github.com/anwala/bloc).

## Development

### Installation & Local Operation
The BLOC website is a Dockerized web application based on the Django framework. It is most stable when ran using Docker, but can also be operated without the use of Docker. The project contains a `Makefile` with commands for the basic setup and maintenance of the development environment.

#### With Docker
To start, you will need to have [Docker](https://www.docker.com/) installed and running locally. After cloning the repository, use the `make secret_file` command to create the `secrets.env` file in the top-level directory of the website. To use the BLOC features, a valid set of Twitter Developer (API V2) credentials must be configured in the project. These are read in from the `secrets.env` file once supplied with a value for `BEARER_TOKEN`. Then, run `make build` to compose the Docker image and begin running the development server. The website is then accessible at the URL `http://localhost:8000/blocdemo/`.  

#### Without Docker
Instead of running inside of a Docker container, the website can also be started directly. Follow the above steps to properly format your `secrets.env` file, but then run `make virtualenv` and `make run_local`. The first of those will install all the required Python modules using the `requirements.txt` file, although you will need at least [Python 3.10](https://www.python.org/downloads/) installed for compatibility. With the virtual environment made, the second command will source the environment and then activate the Django development server.

### Linting
The [Flake8](https://flake8.pycqa.org/en/latest/) code formatter is used for this website to enforce syntax and formatting guidelines. It can be automatically invoked with `make run_flake8`.
