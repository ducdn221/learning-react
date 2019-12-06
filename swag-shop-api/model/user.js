var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('User',user);