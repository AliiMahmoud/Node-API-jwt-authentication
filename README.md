#  [Node API app](#)

> ### <strong> Example Node </strong> (Express + Mongoose) codebase containing real world API examples (CRUD, auth, advanced patterns, etc)

<br>

# Getting started

To get the Node server running:
- `Download Node.js` [here](https://nodejs.org/en/download/)
- `npm install` to install all required dependencies
- Install MongoDB [instructions](https://docs.mongodb.com/manual/installation/#tutorials)


# Code Overview

## Application Structure

- `app.js` - The entry point to the application. This file defines our express server. It also requires the router we'll be using in the application.
- `db.js` -  This file connects the app it to MongoDB using MongoDB node.js driver
- `validators/` - This folder contain JOI's data validation schemas.
- `routers/` - Folder contains the route definitions for the app.
- `models/` - This folder contains the data models.


## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests

- [mongodb](https://www.npmjs.com/package/mongodb) - The official MongoDB driver for Node.js. 

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication

<!-- - [slug](https://github.com/dodo/node-slug) - For encoding titles into a URL-friendly format -->

<!-- - [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication -->

<!-- - [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`. -->