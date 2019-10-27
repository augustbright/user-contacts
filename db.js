const mongodb = require('mongodb');
const { MongoClient } = mongodb;

const { MONGO_URL, MONGO_DB } = process.env;

const client = new MongoClient(MONGO_URL);
const connected = (async function () {
    try {
        await client.connect();
        console.log(`Successfully connected to MongoDB`);
    } catch (error) {
        console.error(`Error connecting to MongoDB`, error);
    }
})();

async function getDB() {
    await connected;
    return client.db(MONGO_DB);
}

async function getCollection(name) {
    const db = await getDB();
    return db.collection(name);
}

module.exports = {
    getDB, getCollection
};
