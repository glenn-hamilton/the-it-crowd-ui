# the-it-crowd-ui

## Using Cloud Instance: 
- There is a AWS UI cloud instance at ```https://9miwn7w3uh.eu-west-1.awsapprunner.com/```

## Running Docker locally
- Run ```docker build -t the_it_crowd_api . && docker run -p 3000:3000-it the_it_crowd_ui```

# ENV Variables

To use DropwizardTheITCrowd UI you will need to have the following environment variables


| Environment Variable | Description     |
|----------------------|-----------------|
| BASE_URL             | API URL Address |


These have been used to connect to the aws database.

```shell
  export BASE_URL=<Add API URL Here>
```


# REST API

This application provides a frontend for the REST API: https://github.com/TaylorJCrawford/the-it-crowd-api

Follow the steps in the above link to run the REST API


# How to start the the-it-crowd-ui application

1. Run `npm install` to build your application
2. Start application with `npm start`
3. To check that your application is running enter url `http://localhost:3000`


# Run Unit Tests

To run unit tests run the following command:

```shell
npm run test-unit
```

Run UI Tests
---

To run UI tests locally, run the following command:

```shell
npm run test-ui
```


# ESLint

[Website](https://eslint.org) |
[Configure ESLint](https://eslint.org/docs/latest/use/configure) |
[Rules](https://eslint.org/docs/rules/) |
[Contribute to ESLint](https://eslint.org/docs/latest/contribute) |
[Report Bugs](https://eslint.org/docs/latest/contribute/report-bugs) |
[Code of Conduct](https://eslint.org/conduct) |
[Twitter](https://twitter.com/geteslint) |
[Discord](https://eslint.org/chat) |
[Mastodon](https://fosstodon.org/@eslint)

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint with a few exceptions:

* ESLint uses [Espree](https://github.com/eslint/espree) for JavaScript parsing.
* ESLint uses an AST to evaluate patterns in code.
* ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

## Run Lint Check Locally

You can run ESLint locally using this command:

```shell
npm run lint
```

## Run Lint Check Fix Locally

You can run ESLint fix locally using this command:

```shell
npm run lint-fix
```
