# BLOC Website

## About
This website is being developed for Dr. Nwala as a web interface for his novel BLOC methodology for analyzing online accounts to discover coordinated actions, bots, and other behaviours. This tool is specifically designed for the analysis of user accounts on [Twitter](https://www.twitter.com). More information about the underlying BLOC algorithm can be found on his [BLOC GitHub](https://github.com/anwala/bloc).

## Development

### Installation & Local Operation
The BLOC website is a [Dockerized](https://www.docker.com/) web application based on the [Django framework](https://www.djangoproject.com/). It is most stable when ran using Docker, but can also be operated without the use of Docker for testing purposes. The project contains a `Makefile` with commands for the basic setup and maintenance of the development environment.

#### With Docker
To start, you will need to have [Docker](https://www.docker.com/) installed and running locally. Clone the website locally with:

```bash
git clone https://github.com/immacdonald/bloc-website.git
```

After cloning the repository, create the `secrets.env` file in the top-level directory of the website using: 

```bash
make secret_file
```

To use the BLOC features, a valid set of [Twitter Developer (API V2)](https://developer.twitter.com/en/docs/twitter-api) credentials must be configured in the project. These are read in from the `secrets.env` file once supplied with a value for `BEARER_TOKEN`. Then,  to compose the Docker image and begin running the development server:

```bash
make build
```

The website is then accessible at the URL `http://localhost:8000/blocdemo/`.  

#### Without Docker
Instead of running inside of a Docker container, the website can also be started directly. Follow the above steps to properly format your `secrets.env` file, but then the following two commands:

```bash
make virtualenv
make run_local
```

The first of those will install all the required Python modules using the `requirements.txt` file, although you will need at least [Python 3.10](https://www.python.org/downloads/) installed for compatibility. With the virtual environment made, the second command will source the environment and then activate the Django development server.

### Linting
The [Flake8](https://flake8.pycqa.org/en/latest/) code formatter is used for this website to enforce syntax and formatting guidelines. It can be automatically invoked using the Makefile:

```bash
make run_flake8
```

## Contributors

Lead development by [Ian MacDonald](https://github.com/immacdonald), with additional contributions by members of William & Mary [Disinfo Lab](https://www.disinfolab.net/).
