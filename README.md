# library-management-system

This is the library-management-system, where you can register, log in, and access restricted resources.

## API Documentation: for Swagger

You can explore the API documentation using Swagger UI. Access the documentation by navigating to:

   http://3.84.245.69:8080/api-docs

## Functionality

The API includes the following functionality:
- User Registration
- User Login and Authentication
- User details 
- book Management- create , update, delete


## Backend Deployment

The backend of this project is deployed on AWS and can be accessed via the following link: 

[Backend Deployment Link](http://3.84.245.69:8080/)


## Backend-Routes
- **User Authentication**:
  - `POST /users/register`: Register a new user.
  - `POST /users/login`: Log in with a registered user.
  - `GET /users/`: Get all user details .

## Getting Started

These instructions will help you set up and run the QuadB Tech Node.js backend project on your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed on your system:

- Node.js (https://nodejs.org/)
- mongodb 
- Git (https://git-scm.com/)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Rubel011/library-management-system.git

2. Navigate to the project directory:
    ```bash
    cd library-management-system
3. Install the project dependencies:
    ```bash
    npm install 

4. Create a .env file in the project root and configure the following environment variables:
    ```markdown
   PORT=8080
    mongoUrl=database link
    saltRounds=15
    ACCESS_TOKEN_SECRET=masai_school
    REFRESH_TOKEN_SECRET=masai_refresh_token


4. Start the server:
    ```
    npm run server
    ```

5. Access the backend API at http://localhost:PORT.
