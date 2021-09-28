# API Documentation

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
| 401 | `AUTHENTICATION REQUIRED` |
| 404 | `NOT FOUND` |
| 405 | `METHOD NOT ALLOWED` |
| 500 | `INTERNAL SERVER ERROR` |
