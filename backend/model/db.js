const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/effyDB")
    .then(() => console.log('DB connection successful: ', "mongodb://localhost:27017/effyDB"))
    .catch((err) => console.error(err));

mongoose.connection.on('connected', function () {
    console.log('Front Mongoose default connection open');
});

mongoose.connection.on('error', function (err) {
    console.log('Front Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Front Mongoose default connection disconnected');
});


