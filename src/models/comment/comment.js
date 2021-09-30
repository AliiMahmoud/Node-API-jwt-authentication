// Importing the Database connection file
const connection = require("../../../db")

// MongoDB cluster's database name
const dbName = 'sample_mflix'
// comments collection
const colName = 'comments'

// production/development flag for error handling 
let isProduction = (process.env.NODE_ENV == 'production')

/**
 * It inserts the given object `comment` into Database
 * and returns the `insertedID`
 * @param {object} comment - comment object to be inserted
 * @param {string} comment.name - the name of the comment
 * @returns the `insertedID` if successful, `null` if not
 * @example
 *  let insertedComment = insertComment({name: 'name'})
*/
module.exports.insertComment = async function (comment) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        return await col.insertOne(comment)
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

/** 
 * It get a `comment` object using the provided `commentId`
 * and returns it if exists
 * @param {object} filter - filter to match
 * @param {string} filter.id - id of the comment
 * @param {string} filter.movie_id - id of the movie
 * @returns `comment` object if exits and `null` if not
 * @example
 *  let comment = getComment({ id: 'commentId', movie_id: 'movie_id' })
 * or
 *  let comment = getComment({ id: 'commentId' })
*/
module.exports.getComment = async function (filter) {
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
 * It *Deletes* a `comment` object using the provided `commentId`
 * and returns `true` or `false`
 * @param {object} filter - filter to match
 * @param {string} filter.id - id of the comment
 * @returns `true` if deleted and `false` if not
 * @example
 *  let deletionFlag = deleteComment({ id: 'commentId' })
*/
module.exports.deleteComment = async function (filter) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const result = await col.findOneAndDelete(filter)
        /// TODO boolean or check the result
        return result
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

/** 
 * It *Updates* a `comment` by searching using the filter 
 * then replace it with new one 
 * if exists if not it inserts a new one
 * @param {object} filter - filter to match
 * @param {string} filter.id - id of the comment
 * @param {object} comment - The new comment
 * @param {string} comment.name - The new comment
 * @returns the replaced documnet if successful, null if not
 * @example
 *  let newComment = updateComment({ id: 'commentId' }, comment)
*/
module.exports.updateComment = async function (filter, comment) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const result = await col.findOneAndReplace(filter, comment)
        return result
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}
