# Card Validator API Service

This project implements a card number validation API endpoint using Node.js, TypeScript, and Express. It determines whether a given card number is valid based on a custom index-based Luhn algorithm and identifies the card type.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [API Endpoint](#api-endpoint)
  - [Request](#request)
  - [Success Response (200 OK)](#success-response-200-ok)
  - [Failure Response (400 Bad Request)](#failure-response-400-bad-request)
- [Design Decisions](#design-decisions)
- [Error Handling Strategy](#error-handling-strategy)

## Features

- Validates card numbers using a custom index-based Luhn algorithm.
- Detects common card types (Visa, MasterCard, American Express, Discover) based on the first digit.
- Provides clear validation details for invalid card numbers.
- Handles bad or missing input gracefully with appropriate HTTP status codes.
- Structured for maintainability and testability.

## Technology Stack

- **Runtime:** Node.js
- **Language:** TypeScript (with `strict: true`)
- **Framework:** Express.js
- **Validation:** Joi (for request schema validation)
- **Testing:** Jest (for unit testing)

## Project Structure

```
card-validator/
├── app/
│   ├── src/
│   │   ├── controller/         # Handles HTTP requests and responses
│   │   │   └── card.controller.ts
│   │   ├── config/             # Environment/config helpers
│   │   │   └── env.ts
│   │   ├── data/
│   │   │   └── schemas/        # Joi validation schemas for request bodies
│   │   │       └── card.schema.ts
│   │   ├── middleware/         # Request validation, 404, and global error handling
│   │   │   └── error.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── route/              # Defines API routes
│   │   │   └── card.route.ts
│   │   ├── service/            # Core business logic (CardValidationService)
│   │   │   └── cardValidation.service.ts
│   │   ├── app.ts              # Express application setup
│   │   └── index.ts            # Application entry point (starts server)
│   ├── test/                   # Unit tests for services
│   │   └── cardValidation.service.test.ts
│   ├── .gitignore
│   ├── .env                    # Local env vars (currently unused by runtime wiring)
│   ├── jest.config.js          # Jest configuration
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json           # TypeScript configuration for the app
├── .git/
├── README.md                   # Project documentation
├── package.json                # Root workspace deps (minimal)
└── tsconfig.json               # Root TypeScript configuration (includes app/src and app/test)
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (usually comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/card-validator.git
    cd card-validator/app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run the application in development mode (with `ts-node`):

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

Note: `app/.env` and `src/config/env.ts` exist, but the current server startup (`src/index.ts`) uses a hard-coded `PORT = 3000` and does not read from `process.env`.

To build and run the compiled JavaScript:

```bash
npm run build
npm start
```

### Running Tests

To run all unit tests using Jest:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## API Endpoint

### `POST /api/v1/validateCard/validate`

Validates a credit card number and returns its validity status, normalized number, card type, and any specific validation details.

#### Request

-   **Method:** `POST`
-   **URL:** `http://localhost:3000/api/v1/validateCard/validate`
-   **Headers:**
    -   `Content-Type: application/json`
-   **Body:**
    ```json
    {
      "cardNumber": "string"
    }
    ```
    **Example:**
    ```json
    {
      "cardNumber": "4111 1111 1111 1111"
    }
    ```

#### Success Response (200 OK)

Returns the validation result.

```json
{
  "isValid": "Valid" | "Invalid",
  "normalizedCardNumber": "string",
  "cardType": "VisaCard" | "MasterCard" | "American Express Card" | "Discover Card" | "Invalid",
  "validationDetails": ["string"]
}
```
**Example (Valid):**
```json
{
  "isValid": "Valid",
  "normalizedCardNumber": "4000000000000002",
  "cardType": "VisaCard",
  "validationDetails": []
}
```
**Example (Invalid Luhn):**
```json
{
  "isValid": "Invalid",
  "normalizedCardNumber": "4000000000000001",
  "cardType": "VisaCard",
  "validationDetails": [
    "Luhn check failed: This is not a valid credit card number."
  ]
}
```
**Example (Invalid Length):**
```json
{
  "isValid": "Invalid",
  "normalizedCardNumber": "400000000000",
  "cardType": "VisaCard",
  "validationDetails": [
    "Invalid length: 12. Expected between 13 and 16 digits."
  ]
}
```

#### Failure Response (400 Bad Request)

Returned when the input `cardNumber` is missing or malformed according to the Joi schema.

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "string"
  }
}
```
**Example:**
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Card number is required."
  }
}
```

#### Failure Response (404 Not Found)

Returned for routes that do not exist.

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Route GET /non-existent-route not found"
  }
}
```

#### Failure Response (500 Internal Server Error)

Returned for unexpected server errors.

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Design Decisions

-   **Express.js:** Chosen for its simplicity, flexibility, and widespread adoption in the Node.js ecosystem. It provides a lightweight foundation for building APIs.
-   **TypeScript:** Ensures type safety, improves code readability, and facilitates refactoring, crucial for a robust backend service. `strict: true` is enabled for maximum type-checking rigor.
-   **Object-Oriented Service (`CardValidationService`):** Encapsulates all card validation and type detection logic within a class. This promotes reusability, testability, and separation of concerns, making the codebase easier to understand and maintain.
-   **Joi for Request Validation:** Provides a powerful and declarative way to validate incoming request payloads, ensuring that the API receives well-formed data at the boundary.
-   **Custom Index-Based Luhn Algorithm:** The `passesLuhnCheck` implementation directly mirrors the provided Java logic, doubling digits at even indices (0-based from the left) and handling sums accordingly.
-   **Detailed Validation Response:** The `validationDetails` array provides granular feedback on why a card number is considered invalid, enhancing the developer experience for API consumers.
-   **Centralized Error Handling:** A global error middleware standardizes API error responses, ensuring consistency and preventing sensitive information (like stack traces) from being exposed in production.
-   **Node.js Test Runner / Jest:** Initially used Node.js's native test runner for minimal overhead, then switched to Jest for its comprehensive features, excellent developer experience, and broad community support, especially for mocking and detailed test reporting.

## Error Handling Strategy

The API employs a centralized error handling strategy:

1.  **Joi Validation Errors:** Handled by the `validateSchema(...)` middleware. If the request body fails schema validation, it forwards an error with `status = 400` and `code = "INVALID_INPUT"` to the global error middleware.
2.  **404 Not Found:** A dedicated `notFoundMiddleware` catches requests to undefined routes, returning a `404 Not Found` with `code: "NOT_FOUND"`.
3.  **Global Error Middleware:** `errorMiddleware` catches all forwarded errors and standardizes the response format to include `code` and `message`. The current implementation does not include stack traces in responses.
