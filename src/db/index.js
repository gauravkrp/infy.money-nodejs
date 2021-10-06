const mongoose = require('mongoose');
const config = require('../config');

const { db } = config; // db_uri string

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
const connect = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};

const disconnect = () => {
  mongoose.connection.close();
};

mongoose.connection.on('connecting', () => console.log(`connecting to MongoDB`));
mongoose.connection.on('open', () => console.log(`MongoDB connected`));
mongoose.connection.on('disconnected', () => console.log(`MongoDB disconnected`));

// Exit application on error
mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

module.exports = {
  connect,
  disconnect,
};
