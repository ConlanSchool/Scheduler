# Interview Scheduler

The Interview Scheduler is a React-based web application that allows users to book, edit, and cancel student interviews. 

## Features

- Appointment slots from Monday to Friday
- Create, edit, and delete interviews
- See the number of available slots per day
- Data is persisted by an API server using a PostgreSQL database
- Jest and Cypress are used for testing
- The client application communicates with an API server over HTTP, using the JSON format

## Setup

First, clone the repository to your local machine:

`git clone https://github.com/<Your Github Username>/interview-scheduler.git`

Then, install dependencies with:

`npm install`

## Running Web Server

Start the web server with:

`npm start`

The application will be served at `http://localhost:8000`.

## Running Jest Test Framework

Run the Jest test framework with:

`npm test`

This will run the unit tests in the application.

## Running Storybook Visual Testbed

Start the Storybook visual testbed with:

`npm run storybook`

This will let you view and interact with your UI components in isolation.

## Running Cypress Integration Test Framework

Make sure the application server is running in test mode, then start Cypress with:

`npm run cypress`

This will run the end-to-end tests in the application.

## Dependencies

- React
- Axios
- Node-SASS
- PropTypes
- Jest
- Cypress
- Storybook
