// app/models/food.js

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
