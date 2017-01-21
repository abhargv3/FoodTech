var https = require('https')
var unirest = require('unirest');
exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome to an FoodTech. Try commands like, Alexa ask foodtech to text me the recipe of Mac and Cheese!", true),
            {}
          )
        )
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`)
        switch(event.request.intent.name) {
          case "AddMeA":
            var intent = event.request.intent.slots.FoodType.value;
            unirest.get("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f87d52d5&_app_key=b0626ee02a7fd70a7db376f59c5cf414&q="+intent)
            .header("X-Mashape-Key", "PyMe0DqaVKmshJHIVjljVczSavCUp1CYb99jsnknSjB0mgWgwa")
            .header("Accept", "application/json")
            .end(function (result) {
              console.log(result);
              var data = (result.body);
              var recipe = data.q;
              var ingredientArr = data.hits[0].recipe.ingredients;
              console.log(data.q);
              console.log(ingredientArr);
              context.succeed(
                generateResponse(
                  buildSpeechletResponse("Okay. Added recipe of " + recipe, true),
                  {}
                )
              )
            });
            break;

          case "TxTMeA":
            var intent = event.request.intent.slots.FoodType.value;
            unirest.get("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f87d52d5&_app_key=b0626ee02a7fd70a7db376f59c5cf414&q="+intent)
            .header("X-Mashape-Key", "PyMe0DqaVKmshJHIVjljVczSavCUp1CYb99jsnknSjB0mgWgwa")
            .header("Accept", "application/json")
            .end(function (result) {
              console.log(result.body);
              var data = result.body;
              var recipe = data.q;
              var ingredientArr = data.hits[0].recipe.ingredients;
              console.log(data.q);
              console.log(ingredientArr);
              //Twillio Stuff goes here
              // Find your account sid and auth token in your Twilio account Console.

              var msg = "Here is your recipe for " + recipe + ".\n";
              for (var i = ingredientArr.length - 1; i >= 0; i--) {
                msg = msg + "\n" + ingredientArr[i].text;
              }

              var accountSid = 'AC5b147772a8494886a6f9096133407dcd';
              var authToken = '9a58a46e6f5868841642cb7e98a765be';


              //require the Twilio module and create a REST client 


              //require the Twilio module and create a REST client
              var client = require('twilio')(accountSid, authToken);

              //Send an SMS text message
              client.sendMessage({

                  to:'+12179798461', // Any number Twilio can deliver to
                  from: '+12175744245', // A number you bought from Twilio and can use for outbound communication
                  body: msg // body of the SMS message

              }, function(err, responseData) { //this function is executed when a response is received from Twilio

                  if (!err) { // "err" is an error received during the request, if any

                      // "responseData" is a JavaScript object containing data received from Twilio.
                      // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                      // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                      console.log(responseData.from); // outputs "+14506667788"
                      console.log(responseData.body); // outputs "word to your mother."

                  }
              });
              context.succeed(
                generateResponse(
                  buildSpeechletResponse("Okay. Texted and added recipe of " + recipe, true),
                  {}
                )
              )
            });
            break;

          /*case "GetVideoViewCountSinceDate":
            console.log(event.request.intent.slots.SinceDate.value)
            var endpoint = "" // ENDPOINT GOES HERE
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body)
                var viewCount = data.items[0].statistics.viewCount
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`Current view count is ${viewCount}`, true),
                    {}
                  )
                )
              })
            })
            break; */

          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}