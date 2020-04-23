
var mongoose = require('mongoose');

/*
    TODO:   Complete the UserSchema which will contain the name and the
            number of contacts in the database.
*/

var UserSchema = new mongoose.Schema({
    // your code here
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    number: Number,
});

module.exports = mongoose.model('User', UserSchema);
