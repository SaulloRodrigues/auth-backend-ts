# Auth Backend TS

Welcome to **Auth Backend TS**, a user authentication API developed in TypeScript. This project provides CRUD operations to manage users and authentication, serving as a backend for frontend applications requiring user management.

## Technologies Used

- **TypeScript**: Main language used for development.
- **Express**: Web framework for Node.js, simplifying API creation.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **bcrypt**: Library for password hashing, ensuring user data security.
- **dotenv**: Loads environment variables from a `.env` file.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB, making database interaction easier.

## Features

- **User Registration**: Allows new users to register.
- **User Login**: Authenticates users and generates JWT tokens for protected routes.
- **User Listing**: Retrieves a list of registered users. *(Protected route)*
- **User Update**: Updates specific user information. *(Protected route)*
- **User Deletion**: Deletes a specific user. *(Protected route)*

## API Routes

Here are the main available API routes:

- 📤`POST /api/auth/register`: Registers a new user.
- 📤`POST /api/auth/login`: Authenticates a user and returns a JWT token.
- ✅`GET /api/users`: Lists all registered users. **(Requires authentication)**
- ✅`GET /api/users/:id`: Retrieves details of a specific user. **(Requires authentication)**
- 🔄`PUT /api/users/:id`: Updates specific user information. **(Requires authentication)**
- 🗑️`DELETE /api/users/:id`: Removes a specific user. **(Requires authentication)**

## Environment Variables

To ensure proper functionality, configure the following environment variables in a `.env` file:

- `PORT`: Port where the application will run. *(Example: `PORT=3000`)*
- `MONGO_URI`: MongoDB database connection URL. *(Example: `MONGO_URI=mongodb://localhost:27017/auth-backend-ts`)*
- `JWT_SECRET`: Secret key for signing JWT tokens. *(Example: `JWT_SECRET=your_secret_key`)*
- `JWT_EXPIRES_IN`: JWT token expiration time. *(Example: `JWT_EXPIRES_IN=1h`)*

## How to Clone and Run the Project

Follow the steps below to clone and run the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SaulloRodrigues/auth-backend-ts.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd auth-backend-ts
   ```

3. **Install dependencies**:

   ```bash
   npm install
   or
   yarn install
   ```

4. **Configure environment variables**:

   Create a `.env` file in the project root and define the variables as mentioned in the [Environment Variables](#environment-variables) section.

5. **Start the server**:

   ```bash
   npm start
   or
   yarn install
   ```

   The server will run on the port defined in the `PORT` variable. You can access the API routes using an HTTP client like Postman or Insomnia.

## Final Considerations

This project serves as a base for systems requiring user authentication. Feel free to contribute, suggest improvements, or adapt it according to your project's needs.

## Author this project

👨‍💻 [@saullorodrigues](https://github.com/SaulloRodrigues)

## Licenses
Some of the licenses for this project in question.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)