function getRecipeJson() {
var apiKey = "your-api-key-here";
var RecipeID = 196149;
var url = "http://api2.bigoven.com/recipe/" + RecipeID + "?api_key="+apiKey;
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
