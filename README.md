# Agwagram

## About
Agwagram is a web interface that allows users to analyze online accounts using the novel BLOC algorithm to explore behaviors and signs of coordinated actions, bots, and other vectors for spreading disinformation. This tool is specifically designed for the analysis of user accounts on [X (formerly) Twitter](https://www.twitter.com). More information about the underlying BLOC algorithm can be found on Dr. Alexander Nwala's [BLOC GitHub](https://github.com/anwala/bloc).

## Development

Current version: **1.1.0**

### Installation & Local Operation
Agwagram is a [Dockerized](https://www.docker.com/) web application containing two components, a frontend interface (Agwagram) built with [React](https://react.dev/) and a backend BLOC Services API built with [Django](https://www.djangoproject.com/). The frontend is a React + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) project. It is most stable when ran using Docker, but can also be operated without the use of Docker for testing purposes. The project contains a `Makefile` with commands for the setup and usage of the development environment.

#### With Docker
To start, you will need to have [Docker](https://www.docker.com/) installed and running locally. Clone the website locally with:

```bash
git clone https://github.com/immacdonald/bloc-website.git
```

After cloning the repository, create the `secrets.env` file in the top-level directory of the website using: 

```bash
make secret_file
```

To use many of the BLOC features, a valid set of [Twitter Developer (API V2)](https://developer.twitter.com/en/docs/twitter-api) credentials must be configured in the project. These are read in from the `secrets.env` file once supplied with a value for `BEARER_TOKEN`. Then,  to compose the Docker image and begin running the development server:

```bash
make docker
```

This command is a combination of `make build` and `make run`, which can also be ran individually when needed. The website is then accessible at the URL `http://localhost:8000/`.  

##### Changing Ports

##### Frontend
To run Agwagram on a different port than the default of `8000`, change the value of `VITE_PORT` in the `development.env` file and the `port` config value in `vite.config.ts`. To apply these changes to an existing Docker container, stop the container and start it again using:

```bash
make run
```

##### Backend
To run the BLOC Services Django server on a port besides the default of `8080`, change the value of `PORT` in the `development.env` file. Make sure to also update the URL that Agwagram uses for its API calls, located in the `Global.tsx` file.

#### Without Docker
Instead of running inside of a Docker container, the website can also be started directly. Follow the above steps to properly format your `secrets.env` file, but then the following two commands:

```bash
make run_local
```

This executes the Makefile commands for running the backend and frontend. The first of those will install all the required Python modules using the `requirements.txt` file, although you will need at least [Python 3.10](https://www.python.org/downloads/) installed for compatibility. With the virtual environment made, it will source the environment and then activate the Django development server. The second command then installs the requires npm packages and starts the Vite development server.

### Linting
The [Flake8](https://flake8.pycqa.org/en/latest/) code formatter is used for BLOC Services to enforce syntax and formatting guidelines. It can be automatically invoked using the Makefile:

```bash
make lint_backend
```

A combination of [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) is used for linting and formatting the Agwagram codebase. It can also be invoked using the Makefile:

```bash
make lint_frontend
```

## Contributors

Lead development by [Ian MacDonald](https://github.com/immacdonald), with additional contributions by members of William & Mary [Disinfo Lab](https://www.disinfolab.net/).
