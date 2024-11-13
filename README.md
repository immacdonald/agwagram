# agwagram

## About
agwagram is a web interface that allows users to analyze online accounts using the novel BLOC algorithm to explore behaviors and signs of coordinated actions, bots, and other vectors for spreading disinformation. This tool is specifically designed for the analysis of user accounts on [X (formerly) Twitter](https://www.twitter.com). More information about the underlying BLOC algorithm can be found on Dr. Alexander Nwala's [BLOC GitHub](https://github.com/anwala/bloc).

## Development
Current version: **1.23.0**

### Installation & Local Operation
agwagram is a [Dockerized](https://www.docker.com/) web application containing two components, a frontend interface (agwagram) built with [React](https://react.dev/) and a backend BLOC Services API built with [Django](https://www.djangoproject.com/). The frontend is a React + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) project. It is most stable when ran using Docker. The project contains a `Makefile` with commands for the setup and usage of the development environment, as well as building the production version.

To start, you will need to have [Docker](https://www.docker.com/) installed and running locally. Clone the website locally with:

```bash
git clone https://github.com/immacdonald/bloc-website.git
```

After cloning the repository, from the top-level directory of the website run:

```bash
make dev
```

This command uses sets the development environment variables and composes the Docker containers, which can also be ran individually when needed. The website is then accessible at the URL `http://localhost:8000/`.

### Frontend

The frontend of agwagram is written in [TypeScript](https://www.typescriptlang.org/) using the [React](https://react.dev/) library and built with [Vite](https://vitejs.dev/). Packages and dependencies are managed with [npm](https://www.npmjs.com/). In order to develop and deploy agwagram you will need to have installed `npm` on your system.

#### Project Structure

On the top level of the project are all the configuration files related to Vite, TypeScript, the [package.json](agwagram/package.json), and utilities related to linting and formatting. The [src](agwagram/src/) folder contains the contents of the React app.

The main file of the React app is [index.tsx](agwagram/src/index.tsx), which contains the contexts for persistent data, URL routing, responsive styling, and the application itself. [App.tsx](agwagram/src/App.tsx) contains the actual routing (done with [react-router-dom](https://reactrouter.com/en/main)).

##### Linting & Formatting

For the frontend, linting is done with [ESLint](https://eslint.org/) while code formatting is done with [Prettier](https://prettier.io/) and [Stylelint](https://stylelint.io/). These can be triggered by executing `npm run format` from the `agwagram` directory. It can also be invoked using the Makefile:

```bash
make lint-frontend
```

#### Data Management

The frontend of agwagram handles several types of data with varying forms and levels of persistency. The [Redux](https://redux.js.org/) library is utilized to make the management of data much more streamlined as well as being more accessible. The [store](agwagram/src/data/store.ts) is home to the global Redux data store, which has several key features:
* The store is capable of being persisted across reloads and between sessions on the site
* Data in the store considered crucial "gates" the remainder of page execution such that it will display a loading animation until it has been read in
* Redux stores consist of "slices' which are related groupings of data that can be interacted with through various hooks and functions

On agwagram the Redux store contains two slices: [apiSlice.ts](agwagram/src/data/apiSlice.ts) and [settingsSlice.ts](agwagram/src/data/settingsSlice.ts).

##### API Data Slice

The API data slice is responsible for fetching, transforming, and caching the data provided by the BLOC backend. The API slice contains the following hooks for accessing data:

```
useGetSymbolsQuery
useGetDefinitionQuery
useSetAnalyzeUserMutation
useSetAnalyzeFilesMutation
```

Redux queries are GET requests and do not take input beyond (occassional) query parameters, while Redux mutations are associated with POST requests that require a body. The settings data can be queried through the following selectors and functions:

```
export const { setTheme, setLoading, setExample, setResults, clearResults } = settingsSlice.actions;

export const selectTheme = (state: RootState): string => state.settings.theme;
export const selectResults = (state: RootState): ResultState => state.settings.results;
```

##### Settings Data Slice

The settings data slice contains global variables for the user's operation of the website, such as the theme and the cache of the most recent agwagram analysis.

#### Types

Being written in TypeScript rather than plain JavaScript offers several advantages and leads to a much more robust system. All data handled is *strictly* typed, meaning it is expected to conform to a particular TypeScript type or interface. These can all be found in [types.ts](agwagram/types.ts). The website is configured to throw errors and fail compilation when typings are not appropriately assigned or respected, but these can be disabled on a situational basis during development.

#### Styling

Styling for agwagram is done with [SCSS](https://sass-lang.com/) contained in [CSS Modules](https://github.com/css-modules/css-modules). Combining both the SCSS pre-processor with the flexibility of CSS modules leads to a much better developer experience and a smoother user experience on the website. The "core" styles are located in [styles/base](agwagram/src/styles/base) and are responsible for CSS variables relating to color and effects, element default styling, and more. A set of SCSS variables (the tokens of the agwagram design system) are imported automatically into all `.scss` files in the project meaning they can be used in any component or view stylesheet with ease. These tokens include things like a range of spaces and font sizes.

#### Changing Frontend Port
To run agwagram on a different port than the default of `8000`, change the value of `VITE_PORT` in the `development.env` file and the `port` config value in `vite.config.ts`. To apply these changes to an existing Docker container, stop the container and start it again.

### Backend

The backend is designed as a simple RESTful API to interface with the BLOC algorithm.

#### Changing Backend Port
To run the BLOC Services Django server on a port besides the default of `8080`, change the value of `PORT` in the `development.env` file. Make sure to also update the URL that agwagram uses for its API calls, located in the `Global.tsx` file.

#### Linting

The [Flake8](https://flake8.pycqa.org/en/latest/) code formatter is used for BLOC Services to enforce syntax and formatting guidelines. It can be automatically invoked using the Makefile:

```bash
make lint-backend
```

### Production & Testing
For the testing (QA) and production version of the website the React frontend is built out as static files and served using `nginx`. The Django server is served with `gunicorn`. In the QA build of agwagram both the frontend and backend are served at the same URL. Use the following command:

```bash
make prod
```

#### Making & Deploying Changes

Any changes to the frontend can be tested by executing `npm run dev` to start up the local development server. When running locally, agwagram will direct it's API requests to a local instance of the backend rather than the production server, so ensure that is running (it can be activated without running the frontend through Docker with `make dev-backend`). Everything else about the local version should accurately reflect how the site will appear and function when deployed, so make sure to test thoroughly.

Before deploying it is highly advised to run the formatter (`npm run format`) to check for ESLint or TypeScript errors, as these *will* cause deployment to fail if found during the build phase. Once that is done, any push to main on the agwagram W&M GitLab repository will trigger an automatic build and deployment pipeline to execute.

## Contributors
Lead development by [Ian MacDonald](https://github.com/immacdonald) in collaboration with [Alexander C. Nwala](https://alexandernwala.com/). Special thanks to the William & Mary IT Department for assistance with hosting.
