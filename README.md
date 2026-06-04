#  VaultPass Backend API

VaultPass is a secure backend system built with Node.js, Express, and MongoDB.  
It simulates a real-world authentication and authorization system with role-based access control, account security features, and activity logging.

## Project Overview

This project was built as part of a backend engineering assignment focused on:
- Authentication & Authorization
- Secure API design
- Role-based access control
- Account security (locking system)
- Activity logging for suspicious actions

The system solves major security flaws such as:
- Unauthorized data access between users
- Overpowered admin privileges
- Lack of token expiration handling
- Exposed sensitive routes
- 
##  Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv (environment variables)
- Morgan (request logging)
- JSON Web Token (JWT)
- bcrypt (password hashing)


##  Project Structure

## Setup
npm install  
Create .env file:  
PORT=4011  
MONGO_URI=your_mongo_uri  
JWT_SECRET=your_secret  
JWT_EXPIRES_IN=1h  

Run server:  
npm run dev  

## Features
- User registration and login (JWT auth)
- Role-based access control (user, moderator, admin)
- Secure password hashing
- Account locking after 5 failed login attempts (15 min lock)
- JWT expiration handling (1 hour)
- Activity logging (failed logins, forbidden access, deletions)

## API Endpoints

Public:
GET /api/public/message

Auth:
POST /api/auth/signup  
POST /api/auth/signin  

User:
GET /api/user/profile (protected)

Moderator:
GET /api/moderator/reports (moderator, admin)

Admin:
DELETE /api/admin/user/:id (admin only, cannot delete self)  
POST /api/admin/promote/:id (admin only, cannot promote admin)

## Security Rules
- Passwords are hashed
- JWT required for protected routes
- Tokens expire in 1 hour
- Accounts lock after repeated failed login attempts
- Unauthorized actions are logged in MongoDB
