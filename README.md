# CGB-Solutions-Backend

This is the backend for the CGB Solutions Blog application. The application allows users to create, update, and delete blogs, with a review process handled by administrators. The backend is built with Node.js, Express, and MongoDB.

- Table of Contents:

Installation
Configuration
Scripts
API Endpoints
Models
Middleware
Controllers
Authentication
Usage

# Installation

1. Clone the repository:

git clone https://github.com/yourusername/cgb-solutions-backend.git
cd cgb-solutions-backend

2. Install dependencies:

npm install

3. Set up your MongoDB database. Update the config/default.json file with your MongoDB URI:

{
"MONGO_URI": "mongodb://0.0.0.0:27017/CGB-Backend",
"PORT": 3000,
"jwtSecret": "/qX6gqENrRLgpxKdqibqSXKDEuQVz/I0xU21/wAJIbQ=",
"jwtExpiration": "24h"
}

# Configuration

All configurations are managed through the config module. Configuration settings are located in the config/default.json file. You can customize the following settings:

MONGO_URI: Your MongoDB connection URI.
PORT: The port number on which your server will run.
jwtSecret: The secret key for JWT token signing.
jwtExpiration: The expiration time for JWT tokens.

# Scripts

start: Starts the server using Node.js.
dev: Starts the server using nodemon for development.

npm start
npm run dev

# API Endpoints

- Authentication

Sign Up

POST /api/signup
Request Body: { userName, email, password }
Response: { message, token }

Log In

POST /api/login
Request Body: { email, password }
Response: { message, token }

- Blog Management

Create Blog

POST /api/blog
Middleware: Middleware
Request Body: { title, date, summary, bannerImageUrl, contentImageUrl }
Response: { message }

Get All Blogs

GET /api/blog
Response: { blogs }

Get Blog by ID

GET /api/blog/:id
Response: { blog }

Get Blogs by User ID

GET /api/blog/user/:userId
Middleware: Middleware
Response: { blogs }

Update Blog

PUT /api/blog/:id
Middleware: Middleware
Request Body: { title, date, summary, bannerImageUrl, contentImageUrl }
Response: { message }

Delete Blog

DELETE /api/blog/:id
Middleware: Middleware
Response: { message }

- Admin Management

Approve Create Request

POST /api/approve-create/:id
Middleware: verifyAdmin
Response: { message }

Reject Create Request

POST /api/reject-create/:id
Middleware: verifyAdmin
Response: { message }

Approve Update Request

POST /api/approve-update/:id
Middleware: verifyAdmin
Response: { message }

Reject Update Request

POST /api/reject-update/:id
Middleware: verifyAdmin
Response: { message }

Approve Delete Request

POST /api/approve-delete/:id
Middleware: verifyAdmin
Response: { message }

Reject Delete Request

POST /api/reject-delete/:id
Middleware: verifyAdmin
Response: { message }

Get All Create Requests

GET /api/create-request
Middleware: verifyAdmin
Response: { requests }

Get All Update Requests

GET /api/update-request
Middleware: verifyAdmin
Response: { requests }

Get All Delete Requests

GET /api/delete-request
Middleware: verifyAdmin
Response: { requests }

- User Management

Get User
GET /api/user
Middleware: Middleware
Response: { user }

# Models

User Model:-

userName (String, required)
email (String, required, unique)
password (String, required)
salt (String, required)
role (String, enum: ["admin", "subadmin"], default: "admin")
Timestamps

Blog Model:-

userId (ObjectId, ref: "User", index: true)
bannerImageUrl (String, required)
contentImageUrl (String, required)
title (String, required)
date (Date, required)
summary (String, required)
status (String, enum: ["pending", "approved", "rejected"], default: "pending")
createRequest (Boolean, default: false)
updateRequest (Boolean, default: false)
deleteRequest (Boolean, default: false)
proposedChanges (Object with fields: title, date, summary, bannerImageUrl, contentImageUrl)
Timestamps

Middleware:-

Auth Middleware
middleware: Verifies JWT token for user authentication.
verifyAdmin: Verifies JWT token and checks if the user has an admin role.

# Controllers

User Controller:-

signup: Handles user registration.
login: Handles user login.
get: Retrieves the logged-in user's information.

Blog Controller:-

create: Handles blog creation.
getOneById: Retrieves a blog by ID.
getAll: Retrieves all blogs.
getAllByUserId: Retrieves all blogs by a specific user.
update: Handles blog updates.
remove: Handles blog deletion.

Admin Controller:-

approveCreate: Approves a blog creation request.
rejectCreate: Rejects a blog creation request.
approveUpdate: Approves a blog update request.
rejectUpdate: Rejects a blog update request.
approveDelete: Approves a blog deletion request.
rejectDelete: Rejects a blog deletion request.
getAllCreateRequest: Retrieves all blog creation requests.
getAllUpdateRequest: Retrieves all blog update requests.
getAllDeleteRequest: Retrieves all blog deletion requests.

# Authentication

The application uses JWT for authentication. Users need to provide a valid token in the Authorization header for protected routes. The token is generated upon successful login and is required for accessing certain API endpoints.

# Usage

Start the server:

npm start

Use an API client like Postman to test the endpoints.

Access the protected routes by providing the JWT token in the Authorization header.

Manage blog requests and approvals through the admin endpoints.
