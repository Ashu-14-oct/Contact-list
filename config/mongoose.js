const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bhaibhaibhai');

const db = mongoose.connection;

//optinal on and once
db.on('error', console.error.bind(console, 'error connecting to database'));

db.once('open', function(){
    console.log('successfully connected to the database');
});

// module.exports = db;