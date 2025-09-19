const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      database = client.db();
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (database) {
    return database;
  }
  throw new Error('Database not initialized');
};

module.exports = {
  initDb,
  getDb
};
