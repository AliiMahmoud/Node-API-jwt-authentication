#  [NodeJS API App with JWT Authentication](#)

> ### <strong> API CRUD Node APP </strong> (Express + MongoDB) with JWT auth.
> Performs CRUD on a simple movies database 

# Outline
1. [Setting the environment](#Setting-things)
2. [API Documentation](#Use-cases)
    - [Authorization](#Authorization)
    - [Endpoints](#API-Endpoints)
    - [Responses](#Response-Format)
3. [Application Structure](#Application-Structure)
4. [Useful Resources](#Useful-Resources)


# Setting-things #

To get the Node server running:
- `Download Node.js` [here](https://nodejs.org/en/download/)
- `npm install` to install all required dependencies
- Install MongoDB [instructions](https://docs.mongodb.com/manual/installation/#tutorials)

# Project Overview
## Use cases ##
    This app Performs API CRUD operations on mongodb database.
        - Authorization/Generate access token
        - movies/theater
        - comment on a movie 
## Authorization ##
    To authenticate an API request, you should provide your API token in the `Authorization` header.
    All API requests require the use of a generated API token. You can find your API token, or generate a new one in the following endpoints.
    Required `body` header data for **both**:
        - email
        - password
    
- ### Create a New User - Generates a New Token 
    ```HTTP
    POST /api/users/
    ```
- ### Login - Get Your Token 
    ```HTTP
    POST /api/users/login
    ```
## API Endpoints ##
- ### For Theaters:-
    | Request | Method| Description |
    | :--- | ---- | :--- |
    | ```/api/theaters``` | ***GET*** | Gets all theaters
    | ```/api/theaters``` | ***POST*** | Creates a new theater
    | ```/api/theaters/{theaterId}``` | ***GET*** | Gets a specific theater using ID
    | ```/api/theaters/{theaterId}``` | ***PUT*** | Updates a theater if exists, create it if not
    | ```/api/theaters/{theaterId}``` | ***DELETE*** | Deletes a specific theater using ID
- ### For Movies:-
    | Request | Method| Description |
    | :--- | ---- | :--- |
    | ```/api/movies``` | ***GET*** | Gets all movies
    | ```/api/movies``` | ***POST*** | Creates a new movie
    | ```/api/movies/{movieId}``` | ***GET*** | Gets a specific movie using ID
    | ```/api/movies/{movieId}``` | ***PUT*** | Updates a movie if exists, create it if not
    | ```/api/movies/{movieId}``` | ***DELETE*** | Deletes a specific movie using ID

- ### For Commenting on a movie:-
    | Request | Method| Description |
    | :--- | ---- | :--- |
    | ```/api/movies/{movieId}/comments``` | ***GET*** | Gets movie's all comments
    | ```/api/movies/{movieId}/comments``` | ***POST*** | Creates a new comment on a movie
    | ```/api/movies/{movieId}/comments/{commentId}``` | ***GET*** | Gets a movie's comment by ID
    | ```/api/movies/{movieId}/comments/{commentId}``` | ***PUT*** | Updates a new comment
    | ```/api/movies/{movieId}/comments/{commentId}``` | ***DELETE*** | Deletes a comment using ID 

    


## Response Format ##
Most of endpoints return the JSON representation of the resources created or edited.

```javascript
{
  "message" : string,
  "success" : bool,
  "data"    : string
}
```

The `message` attribute contains a message commonly used to indicate errors.

The `success` attribute describes if the transaction was successful or not.

The `data` attribute contains any other associated with the response..

## Used Status Codes

It returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 404 | `NOT FOUND` |
| 405 | `METHOD NOT ALLOWED` |
| 500 | `INTERNAL SERVER ERROR` |

---

## Application Structure ##

- `app.js` - The entry point to the application. This file defines our express server. It also requires the router we'll be using in the application.
- `db.js` -  This file connects the app it to MongoDB using MongoDB node.js driver
- `routers/` - Folder contains the route definitions for the app.
- `middlewares/` - Folder contains our middlewares to handle requests (jwt, error handler).
- `controllers/` - This folder contains main controllers.
- `models/` - This folder contains the data models.
- `validators/` - This folder contain JOI's data validation schemas.


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

-------

# Useful Resources #

- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook) - To understand how JWT works
- [Express middlewares](https://expressjs.com/en/guide/using-middleware.html) - To use middlewares as documented
- [Joi ](https://joi.dev/api/) `Documentation`
