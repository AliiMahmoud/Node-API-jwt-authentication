const connection = require("../../../db")


// MongoDB cluster's database name
const dbName = 'sample_mflix'
// users collection
const colName = 'users'

// production/development flag for error handling 
let isProduction = (process.env.NODE_ENV == 'production')

/**
 * It inserts the given object `user` into Database
 * and returns the `insertedID`
 * @param {Object} user - inserted user object
 * @param {String} user.email - user provided email
 * @param {String} user.password - hash string of user's password
 * @returns the `insertedID` if successful, `null` if not
 * @example
 *  let insertedUser = insertUser({email: 'email', 'password': 'c1d1af33322fffd'})
*/
module.exports.insertUser = async function (user) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        return await col.insertOne(user)
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

/** 
 * It `get` a user object using the provided **username** and **hash**
 * and returns it
 * @param {Object} filter - filter to match
 * @param {String} filter.email - user provided email
 * @param {String} filter.password - hash string of user's password
 * @returns `User` Object if exits and `null` if not
 * @example
 *  let user = getUser({ email: 'email', password: 'c1d1af33322fffd' })
 * or
 *  let user = getUser({ email: 'email' })
*/
module.exports.getUser = async function (filter) {
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

