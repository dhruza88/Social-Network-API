const mongoose = require('mongoose');

//
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmedia', { //connect database to server
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;