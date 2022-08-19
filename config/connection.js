const { Module } = require('module');
const { connect, connection } = require('mongoose');

const connectionString = processs.env.MONGOD_URI || 'mongodb: //127.0.0.1:27017'

connect(connectionString, {
    useNewlUrlParser: true,
    useUnifiedTopology: true,
});

Module.exports = connection;