// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FoodSchema   = new Schema({	
    text: String,
    quantity: Number,
    measure: String,
    food: String,
    weight: Number
});

module.exports = mongoose.model('Food', FoodSchema);

/*var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);*/