# Aribnfree
> Hackathon project for the [Southeast startup challenge](http://southeaststartupchallenge.com/) 

Airbnfree helps match peopel that need housing with people willing to put up someone for the night. This process coincides with federal housing assistance programs for people in need.

## Installing / Getting started

The project is split up into a monorepo - for no political reason other than ease of use. The server folder contains all the projects backend code (Typescript) while the app folder contains all of the frontend code (React/Redux).

To get started you'll first need to have node installed on your system along with __yarn__.

> This project uses __yarn__ to install all dependencies so it is required to getting up and running
> you can use NPM to install packages for your general environment - but yarn will be assumed from here on out.

You'll also need to have Postgres installed and a database called ```test``` already created (so migrations can be ran).

Next, install all dependencies and run all setup scripts:

#### Backend

```shell
cd server/
yarn
yarn orm schema:sync
yarn resetdb
yarn start
```

> If you need clean data just run ```yarn resetdb``` to reset everything.

#### Frontend

```shell
cd app/ && yarn
yarn start:dev
```

Bam, you're done.

### Built With
* Node 9.6.0
* TypeScript
* TS-Node 5.0.1
* React 16.2.0
* Redux 3.7.2
* ESLint 4.13.1
* Styled-Components 3.2.3
* Babel 6.26.0

### Prerequisites

* [Postgres](https://www.postgresql.org/)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Tests

It was a hackathon so - tests tbd.

## Style guide

All frontend code is in ES6 format and all code styles in the project are defined by Airbnb's [JavaScript style guide](https://github.com/airbnb/javascript). All code is enforced by ESLint / TSLint.
