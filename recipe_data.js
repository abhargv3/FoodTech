var unirest = require('unirest');


// These code snippets use an open-source library. http://unirest.io/nodejs
var result = unirest.get("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f87d52d5&_app_key=b0626ee02a7fd70a7db376f59c5cf414&q=spaghetti")
.header("X-Mashape-Key", "PyMe0DqaVKmshJHIVjljVczSavCUp1CYb99jsnknSjB0mgWgwa")
.header("Accept", "application/json")
.asJson();

	
  //console.log(result.status, result.headers, result.body);
  console.log(result.body);
  console.log("hello");
  var p = JSON.parse(result.body);
