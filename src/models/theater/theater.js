// Importing the Database connection file
const connection = require("../../../db")

// MongoDB cluster's database name
const dbName = 'sample_mflix'
// theaters collection
const colName = 'theaters'

// production/development flag for error handling 
let isProduction = (process.env.NODE_ENV == 'production')

/**
 * It inserts the given object `theater` into Database
 * and returns the `insertedID`
 * @param {Object} theater - theater object to be inserted
 * @param {String} theater.name - the name of the theater
 * @returns the `insertedID` if successful, `null` if not
 * @example
 *  let insertedTheater = insertTheater({name: 'name'})
*/
module.exports.insertTheater = async function (theater) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        return await col.insertOne(theater)
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

/** 
 * It get a `theater` object using the provided `theaterId`
 * and returns it if exists
 * @param {Object} filter - filter to match
 * @param {String} filter.id - id of the theater
 * @returns `theater` Object if exits and `null` if not
 * @example
 *  let theater = getTheater({ id: 'theaterId' })
*/
module.exports.getTheater = async function (filter) {
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
 * It *Deletes* a `theater` object using the provided `theaterId`
 * and returns `true` or `false`
 * @param {Object} filter - filter to match
 * @param {String} filter.id - id of the theater
 * @returns `true` if deleted and `false` if not
 * @example
 *  let deletionFlag = deleteTheater({ id: 'theaterId' })
*/
module.exports.deleteTheater = async function (filter) {
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
 * It *Updates* a `theater` by searching using the filter 
 * then replace it with new one if exists if not it inserts a new one
 * @param {object} filter - filter to match
 * @param {string} filter.id - id of the theater
 * @param {object} theater - The new theater
 * @param {string} theater.name - The new theater
 * @returns the replaced documnet if successful, null if not
 * @example
 *  let newTheater = updateTheater({ id: 'theaterId' }, theater)
*/
module.exports.updateTheater = async function (filter, theater) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const result = await col.findOneAndReplace(filter, theater)
        return result
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

