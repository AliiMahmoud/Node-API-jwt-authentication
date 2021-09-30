#  [NodeJS API App with JWT Authentication](#)

> ### <strong> API CRUD Node APP </strong> (Express + MongoDB) with JWT auth.
> This app Performs API CRUD operations on mongodb movies database.
>>        - Authorization/Generate access token
>>        - CRUD on movies/theater
>>        - CRUD on movie's comment  

# Setting things #

To get the Node server running:
- `Download Node.js` [here](https://nodejs.org/en/download/)
- `npm install` to install all required dependencies
- Install MongoDB [instructions](https://docs.mongodb.com/manual/installation/#tutorials)


## Documentation

- [Authorization](./_docs/api-documentation.md#Authorization)
- [Endpoints](./_docs/api-documentation.md#API-Endpoints)
- [Responses](./_docs/api-documentation.md#Response-Format)

# Project Overview

## Application Structure `src/` ##

- `app.js` - The entry point to the application. This file defines our express server, requires the routers and some middlewares.
- `db.js` -  This file connects the app to MongoDB using MongoDB node.js driver
- `routers/` - Folder contains the route definitions for the app.
- `middlewares/` - Folder contains our middlewares to handle some requests (jwt, error handler).
- `controllers/` - This folder contains main controllers.
- `models/` - This folder contains the data models.
- `models/modelname/schema` - This file contain JOI's data validation schema for every data model.


## Dependencies

```json
[
    "dotenv", "express", "express-jwt", "joi", "jsonwebtoken", "md5", "mongodb", "morgan"
]
```
- [express](https://github.com/expressjs/express) - The server for handling and routing requests
- [mongodb](https://www.npmjs.com/package/mongodb) - The official MongoDB driver for Node.js. 
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [Joi](https://github.com/sideway/joi) - A schema description language and data validator for JS.
- [dotenv](https://github.com/motdotla/dotenv) - A module to load environment variables from a .env file into process.env
- [morgan](https://github.com/expressjs/morgan#readme) - Request logger middleware

---------------

# Useful Resources #

- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook) - To understand how JWT works
- [Express middlewares](https://expressjs.com/en/guide/using-middleware.html) - To use middlewares as documented
- [Joi ](https://joi.dev/api/) `Documentation`
- [Using MongoDB Driver with Node](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database)
