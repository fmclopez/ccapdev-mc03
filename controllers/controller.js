const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        // your code here
        db.findMany(User, {}, '', function(result) {  //select ALL 
            res.render('home', {
                users: result
            }); // This is to load the page initially
        });

        //res.render() displays the html content 
        //can add conditions and information inside {}
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        // your code here
        db.findOne(User, {number:req.query.number}, function(result){
           
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        // your code here

        //.body -> if POST and bodyParser,urlencoded cuz difficult to find if not parse 
        //.param -> if GET and included in the url itself
        var user = {
            name: req.query.name,
            number: req.query.number
        } 
        console.log(user.name);
        console.log(user.number);

        db.insertOne(User,user, function(result){
            if (result) {
                res.render('partials/card', {
                    name: user.name,
                    number: user.number
                }, function(err, html) {
                    res.send(html);  //put result into an html file to be appended when passed to home.hbs
                });
                console.log("Successfully added contact!");
                console.log(result);
            }
            else{
                res.send(null); 
            }
            //res.send() returns result of database pr etc to "caller"
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        // your code here
        db.deleteOne(User, {number : req.query.number}, function(result){
            res.send(result)
        });
    }

}

module.exports = controller;
