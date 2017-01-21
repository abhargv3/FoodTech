// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f87d52d5&_app_key=b0626ee02a7fd70a7db376f59c5cf414&q=spaghetti")
.header("X-Mashape-Key", "PyMe0DqaVKmshJHIVjljVczSavCUp1CYb99jsnknSjB0mgWgwa")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});



function myFunction() {
    var x = document.getElementById("mySearch").value;

    document.getElementById("demo").innerHTML = "To make " + x + " you need these ingredients: ";
}

function getRecipeJson() {
        var apiKey = "your-api-key-here";
        var TitleKeyword = "lasagna";
        var url = "http://api2.bigoven.com/recipes?pg=1&rpp=25&title_kw="
                  + TitleKeyword
                  + "&api_key="+apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
                alert('success');
                //console.log(data);
            }
        });
    }
