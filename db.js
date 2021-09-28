const { MongoClient } = require("mongodb");

// Database URL
const url = process.env.DB;
//  Preparing the Mongo cilent database
const client = new MongoClient(url);

/** Connect to the Mongodb Client */
module.exports.connect = async function () {
    try {
        await client.connect();
    }
    catch (err) {
        // error handling
        throw new Error(err.message)
    }
}

/** Returns the Mongo's database (db) object of the given name 
 *  @param {String} dbName - The name of Database 
 *  @returns db (MongoClient.db)
 */
module.exports.getDB = function (dbName) {
    try {
        return client.db(dbName)
    }
    catch (err) {
        throw new Error(err.message)
    }
}

/**  Close mongoDB connection */
module.exports.close = async function () {
    try {
        await client.close();
    }
    catch (err) {
        throw new Error(err.message)
    }
}