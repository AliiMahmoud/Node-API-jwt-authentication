#  [NodeJS API App with JWT Authentication](#)

> ### <strong> Example Node </strong> (Express + MongoDB) with CRUD, JWT auth, etc

<br>

# Setting things

To get the Node server running:
- `Download Node.js` [here](https://nodejs.org/en/download/)
- `npm install` to install all required dependencies
- Install MongoDB [instructions](https://docs.mongodb.com/manual/installation/#tutorials)

# Project Overview

## Application Structure

- `app.js` - The entry point to the application. This file defines our express server. It also requires the router we'll be using in the application.
- `db.js` -  This file connects the app it to MongoDB using MongoDB node.js driver
- `routers/` - Folder contains the route definitions for the app.
- `middlewares/` - Folder contains our middlewares to handle requests (jwt, error handler).
- `controllers/` - This folder contains main controllers.
- `models/` - This folder contains the data models.
- `validators/` - This folder contain JOI's data validation schemas.


## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing requests

- [mongodb](https://www.npmjs.com/package/mongodb) - The official MongoDB driver for Node.js. 

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication

- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication

## Useful Resources

- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook) - To understand how JWT works
- [Express middlewares](https://expressjs.com/en/guide/using-middleware.html) - To use middlewares as documented

- [Link](https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/) - An article about JWT with node.js 
