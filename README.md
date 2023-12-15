# Agwagram

## About
Agwagram is a web interface that allows users to analyze online accounts using the novel BLOC algorithm to explore behaviors and signs of coordinated actions, bots, and other vectors for spreading disinformation. This tool is specifically designed for the analysis of user accounts on [X (formerly) Twitter](https://www.twitter.com). More information about the underlying BLOC algorithm can be found on Dr. Alexander Nwala's [BLOC GitHub](https://github.com/anwala/bloc).

## Development
Current version: **1.4.0**

### Installation & Local Operation
Agwagram is a [Dockerized](https://www.docker.com/) web application containing two components, a frontend interface (Agwagram) built with [React](https://react.dev/) and a backend BLOC Services API built with [Django](https://www.djangoproject.com/). The frontend is a React + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) project. It is most stable when ran using Docker. The project contains a `Makefile` with commands for the setup and usage of the development environment, as well as building the production version.

To start, you will need to have [Docker](https://www.docker.com/) installed and running locally. Clone the website locally with:

```bash
git clone https://github.com/immacdonald/bloc-website.git
```

#### Development
After cloning the repository, from the top-level directory of the website run:

```bash
make dev
```

This command uses sets the development environment variables and composes the Docker containers, which can also be ran individually when needed. The website is then accessible at the URL `http://localhost:8000/`.  

##### Changing Frontend Port
To run Agwagram on a different port than the default of `8000`, change the value of `VITE_PORT` in the `development.env` file and the `port` config value in `vite.config.ts`. To apply these changes to an existing Docker container, stop the container and start it again.

##### Changing Backend Port
To run the BLOC Services Django server on a port besides the default of `8080`, change the value of `PORT` in the `development.env` file. Make sure to also update the URL that Agwagram uses for its API calls, located in the `Global.tsx` file.

### Production & Testing
For the testing (QA) and production version of the website the React frontend is built out as static files and served using `nginx`. The Django server is served with `gunicorn`. In the QA build of Agwagram both the frontend and backend are served at the same URL. Use the following command:

```bash
make prod
```

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
Lead development by [Ian MacDonald](https://github.com/immacdonald), with additional contributions by members of William & Mary [Disinfo Lab](https://www.disinfolab.net/). Special thanks to the William & Mary IT Department for assistance with hosting.
