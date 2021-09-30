// Importing the Database connection file
const connection = require("../../../db")

// MongoDB cluster's database name
const dbName = 'sample_mflix'
// movies collection
const colName = 'movies'

// production/development flag for error handling 
let isProduction = (process.env.NODE_ENV == 'production')

/**
 * It inserts the given object `Movie` into Database
 * and returns the `insertedID`
 * @param {Object} movie - Movie object to be inserted
 * @param {String} movie.name - the name of the movie
 * @returns the `insertedID` if successful, `null` if not
 * @example
 *  let insertedMovie = insertMovie({name: 'name'})
*/
module.exports.insertMovie = async function (movie) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        return await col.insertOne(movie)
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

/** 
 * It get a `movie` object using the provided `movieId`
 * and returns it if exists
 * @param {Object} filter - filter to match
 * @param {String} filter.id - id of the movie
 * @returns `movie` Object if exits and `null` if not
 * @example
 *  let movie = getMovie({ id: 'movieId' })
*/
module.exports.getMovie = async function (filter) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const result = await col.findOne(filter)
        return result
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

/** 
 * It get all `movies` in the Database in an array
 * @returns `movies` Array
 * @example
 *  let movies = getAllMovies()
*/
module.exports.getAllMovies = async function () {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const cursor = col.find({})
        let count = 10
        let result = []
        while (await cursor.hasNext() && count) {
            result.push(await cursor.next())
            count--
        }
        return result
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

/** 
 * It *Deletes* a `movie` object using the provided `movieId`
 * and returns `true` or `false`
 * @param {Object} filter - filter to match
 * @param {String} filter.id - id of the movie
 * @returns `true` if deleted and `false` if not
 * @example
 *  let deletionFlag = deleteMovie({ id: 'movieId' })
*/
module.exports.deleteMovie = async function (filter) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const result = await col.findOneAndDelete(filter)
        // Not found
        if (result.value == null)
            return false
        else
            return result.value
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

/** 
 * It *Updates* a `movie` by searching using the filter 
 * then replace it with new one if exists if not it inserts a new one
 * @param {object} filter - filter to match
 * @param {string} filter.id - id of the movie
 * @param {object} movie - The new movie
 * @param {string} movie.name - The new movie
 * @returns the replaced documnet if successful, null if not
 * @example
 *  let newMovie = updateMovie({ id: 'movieId' }, movie)
*/
module.exports.updateMovie = async function (filter, movie) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const result = await col.findOneAndReplace(filter, movie)
        // if not found return false opertaion
        if (result.value == null)
            return false
        else
            return true

    }
    catch (error) {
        if (!isProduction)
        console.log(error.stack)
        return null;
    }
}


