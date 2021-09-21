const { MongoClient } = require("mongodb");

const url = 'mongodb+srv://mainuser:nfErHB6vp7Wnh1Hb@node-api.ngdzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'weather-api'

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("persons");

        let personDocument = {
            "name": { "first": "Alan", "last": "Turing" },
            "birth": new Date(1912, 5, 23),
            "death": new Date(1954, 5, 7),
            "contribs": ["Turing machine", "Turing test", "Turingery"],
            "views": 1250000
        }
        // Insert a single document, wait for promise so we can read it back
        const per = await col.insertOne(personDocument)

        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);