const { MongoClient } = require("mongodb");

// TO-DO here //
// moved to -> ENV 

// Database URL
const url = 'mongodb+srv://mainuser:nfErHB6vp7Wnh1Hb@node-api.ngdzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//  Preparing the Mongo cilent database
const client = new MongoClient(url);

/** Connect to the Mongodb Client */
module.exports.connect = async function () {
    try {
        await client.connect();
        // console.log("Connected correctly to DataBase");
    }
    catch (err) {
        console.log(err.stack);
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
        console.log(err.stack);
    }
}

/**  Close mongoDB connection */
module.exports.close = async function () {
    try {
        await client.close();
    }
    catch (err) {
        console.log(err.stack);
    }
}