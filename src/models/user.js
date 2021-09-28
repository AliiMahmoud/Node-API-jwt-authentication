const connection = require("../../db")


// MongoDB cluster's database name
const dbName = 'sample_mflix'
// users collection
const colName = 'users'

// production/development flag for error handling 
let isProduction = (process.env.NODE_ENV == 'production')

/**
 * It inserts the given object [user] into Database
 * and returns true if inserted
 * @param {Object} user - inserted user object
 * @param {String} user.email - user provided email
 * @param {String} user.password - hash string of user's password
 * @returns true if inserted, false if not
 * @example
 *  let flag = insertUser({email: 'email', 'password': 'c1d1af33322fffd'})
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
 * It get a user object using the provided username and hash
 * and returns it
 * @param {Object} user - user object
 * @param {String} user.email - user provided email
 * @param {String} user.password - hash string of user's password
 * @returns Object [User] if exits and null if not
 * @example
 *  let user = getUser({ email: 'email', password: 'c1d1af33322fffd' })
 * or
 *  let user = getUser({ email: 'email' })
*/
module.exports.getUser = async function (user) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const result = await col.findOne(user)
        return result
    }
    catch (error) {
        if (!isProduction)
            console.log(error.stack)
        return null;
    }
}

