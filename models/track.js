const connection = require("../../db")

// MongoDB cluster's database name
const dbName = 'music'
// collection name
const colName = ''

/**
 * It inserts the given object [track] into Database
 * and returns true if inserted
 * @param {Object} track - inserted track object
 * @returns true if inserted, error if not
 */
module.exports.insertTrack = async function (track) {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        await col.insertOne(track)
        return true;
    }
    catch (error) {
        return error;
    }
}

/** */
module.exports.getTrack = async function () {
    try {
        const db = connection.getDB(dbName)
        const col = db.collection(colName);
        const track = await col.findOne({})
        console.log(track);
        return track
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
