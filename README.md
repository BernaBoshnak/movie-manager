# Movie Manager

This is a Movie Manager app built using `React` and `TypeScript` with `Vite`.

## Demo [link](https://movie-manager-7fabc.web.app/)

## Description

This project introduces a user-friendly web form designed for the effortless upload of a `.txt` file containing a list of movie titles. The uploaded file is processed, and the movie titles are displayed on the page with corresponding checkboxes, allowing users to filter out unwanted records.

The search feature allows fetching more movies from the [TMDB API](https://developer.themoviedb.org/reference/search-movie).

Each card corresponds to a searched movie title and features `Edit` and `Bin` icons, allowing users to effortlessly edit and remove movies.

Upon clicking the `Save` button, the data of the selected movies is meticulously structured into JSON format and dispatched to a save endpoint.

It's important to note that, for this task, the save endpoint is represented by a dummy endpoint. In a real-world scenario, a fully functional back-end would be implemented to handle and process the save request seamlessly.

#### Features:

- **Manual Search**
  - Users have the flexibility to perform additional TMDB searches directly on the preview page. By typing the movie title in the provided input field, a dynamic dropdown displays suggested results. Clicking on a result seamlessly adds a new movie card to the bottom of the preview page.
- **Language Filtering**
  - Users can personalize their experience by selecting their preferred language.
- **Genre Filtering**
  - Users can refine the displayed movie cards based on specific genres of interest.
- **Results Reordering**
  - This feature allows users to arrange movie results based on popularity, providing a personalized viewing experience. The chosen order is then preserved through the save endpoint for future reference.
- **Manual editing of fields**
  - Users can manually edit information within fields before initiating the saving process.

These additional features empower users with enhanced control and customization options, elevating the overall user experience on the preview page.

## Setup Instructions

To ensure the proper functionality of this project, it is essential to create an `.env` file. A sample file, `.env.example`, has been provided as a reference, and the contents should be replaced with the actual values.

An access token should be generated from the [TMDB API](https://developer.themoviedb.org/docs/getting-started).

**CI configuration:**

A continuous integration (CI) workflow in the repository is set up using `GitHub Actions` triggered on every push to the main branch, performing the following checks:

- **types**

  - Ensures TypeScript types in the project are valid.

- **formatting**

  - Validates code formatting using Prettier.

- **linting**

  - Performs static code analysis with ESLint.

- **Run tests**
  - Executes unit tests using Cypress.

## Available Scripts

You need to have [NodeJS](https://nodejs.org/en/) installed to run the scripts. To install the dependencies, run `npm install` first.

- **dev**
  Runs the app in the development mode on the local server.
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- **build**
  Utilizes the `TypeScript` compiler to transpile `TypeScript` code into `JavaScript` and then uses Vite to build the final version of the project for production.

- **lint**
  Uses `ESLint` for static code analysis, providing hints and warnings to improve code quality.

- **ts-validate**
  Checks `TypeScript` files for errors and types without generating output files.

- **format, check-format**
  Utilizes Prettier for automatic code formatting, maintaining consistency in the visual style of the code.

- **cy:open-unit, cy:run-unit, test**
  Integrates Cypress for executing component tests, aiding in test automation and building confidence in the stability of the application.

- **validate**
  Enables simultaneous execution of linting, `TypeScript` validation, and formatting checks in parallel, providing a comprehensive code validation process.

## Technologies used

- React
- TypeScript
- Cypress
- HTML5
- SCSS
- ESlint
- Vite
- Git
- Bootstrap (incl. `react-bootstrap`)
- Prettier
