#API Documentation for User and Habit Management for CSE 341 Project 2

This is a RESTful API built using Node.js, Express, MongoDB, and Swagger for documentation.

#Getting Started

Follow these steps to set up and run the project locally.

# Prerequisites
- Node.js
- MongoDB
- Swagger
- Swagger UI
- Express
- EJS
- Body-Parser
- Cors
- Express-session
- Dotenv

# Installation
1. Clone the repository to your local machine.
```
git clone https://github.com/Axelh98/week03-04.git
```
2. Navigate to the project directory.
```
cd week03-04
```
3. Install the required dependencies.
```
npm install
```
4. Create a .env file in the root directory and add the following variables:
```
MONGODB_URI=mongodb://localhost:27017/user-management-habit-app
SESSION_SECRET=your-secret-key
```
5. Start the server.
```
npm start   
```
6. Open your browser and navigate to http://localhost:8080/api-docs to view the API documentation.

#API Documentation
The API documentation can be accessed at http://localhost:8080/api-docs.

#Technologies Used
- Node.js: JavaScript runtime for server-side programming.
- Express.js: Framework for route and middleware management.
- EJS: Template engine for rendering dynamic views.
- MongoDB: NoSQL database for storing user information.
- Swagger: Tool for generating API documentation.
- Swagger UI: Tool for viewing and testing API documentation.
- Express-session: Middleware for session management.
- dotenv: Module for environment variable management.
- Body-Parser: Middleware for parsing request bodies.
- Cors: Middleware for handling Cross-Origin Resource Sharing (CORS).   
 
 #Api Endpoints
 ## Authentication
 ### Login
 ```
 POST /auth/login
 ```
 ### Register
 ```
 POST /auth/register
 ```
 ### Logout
 ```
 GET /auth/logout
 ```
 ## Habit Management
 ### Get Habits
 ```
 GET /habits
 ```
 ### Create Habit
 ```
 POST /habits
 ```
 ### Update Habit
 ```
 PUT /habits/:id
 ```
 ### Delete Habit
 ```
 DELETE /habits/:id
 ```

 # Project Structure
```
.
├── controllers/
│   ├── authController.js      # Handles authentication logic
│   ├── dashboardController.js # Handles dashboard logic
│   └── habitController.js     # Handles habit management logic
│
├── models/
│   ├── user.js                # User model
│   └── habit.js               # Habit model
│
├── routes/
│   ├── auth.js                # Authentication routes
│   ├── dashboard.js           # Dashboard routes
│   └── habits.js              # Habit routes
│
├── views/
│   ├── auth/                  # Login and registration forms
│   ├── dashboard.ejs          # Dashboard view
│   ├── habits/                # Habit-related views
│   ├── partials/              # Reusable components like header and footer
│   └── error.ejs              # Error page
│
├── public/                    # Static files (CSS, JS, images)
├── .env                       # Environment variables
├── app.js                     # Main application setup
├── package.json               # Project metadata and dependencies
└── README.md                  # Project documentation      
``` 


