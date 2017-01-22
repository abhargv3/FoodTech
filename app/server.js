// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://root:foodtech@ds117869.mlab.com:17869/heroku_7g1wzzsv'); // connect to our database
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
//mongoose.connect('mongodb://root:password@ds159208.mlab.com:59208/foodtech');

var Food = require('./models/food');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here



router.route('/foods')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var food = new Food();      // create a new instance of the Bear model
        food.text = req.body.text;  // set the bears name (comes from the request)
        food.quantity = req.body.quantity;
        food.measure = req.body.measure;
        food.food = req.body.food;
        food.weight = req.body.weight;
        
        // save the bear and check for errors
        Food.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Recipe created!' });
        });
        
    })
        // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Food.find(function(err, foods) {
            if (err)
                res.send(err);

            res.json(foods);
        });
    });


 // REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//On routes that end with /food

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);