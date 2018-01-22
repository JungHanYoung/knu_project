const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    mongoose.connect('mongodb://root:1234@52.79.127.176:27017/test1?authSource=admin', function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  require('./models/schema.js');
};
