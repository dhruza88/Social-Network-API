const { Module } = require('module');
// const { connect, connection } = require('mongoose');
const { mongoose } = require('mongoose');

const connectionString = process.env.MONGOD_URI || 'mongodb: //127.0.0.1:27017/socialmedia'

mongoose.connect(
    connectionString, {
    useNewlUrlParser: true,
    useUnifiedTopology: true,
}
);

Module.exports = mongoose.connection;