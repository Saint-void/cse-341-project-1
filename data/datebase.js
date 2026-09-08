const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../routes/.env') });

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if(database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }
    if (!process.env.MONGODB_URI) {
        return callback(new Error('MONGODB_URI is not configured'));
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client.db();
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }   
    return database;
};

module.exports = {
    initDb,
    getDatabase
};