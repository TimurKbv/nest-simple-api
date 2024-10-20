# NestJS User API


## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Endpoints

- `GET /v1/users`: Retrieve all users
- `GET /v1/users/:id`: Retrieve a specific user by ID

## Project Structure

- `src/users/dto/user.dto.ts`: Data Transfer Object for User
- `src/users/users.service.ts`: Service for handling user data
- `src/users/users.controller.ts`: Controller for user endpoints
- `src/users/users.module.ts`: Module for Users feature
- `src/users.json`: JSON file containing user data

## Running Tests

To run the unit tests for this project, use the following command:

```bash
npm run test
```

This will execute all the unit tests and display the results in the console.