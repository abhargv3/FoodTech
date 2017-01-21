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
              var ingredientArr = data.hits[0].ingredientLines;
              console.log(data.q);
              console.log(ingredientArr);
              context.succeed(
                generateResponse(
                  buildSpeechletResponse("Okay. Added recipe of ${recipe}", true),
                  {}
                )
              )
            });
            break;

          case "TxTMeA":
            var intent = event.request.intent.slots.FoodType.value;
            unirest.get("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f87d52d5&_app_key=b0626ee02a7fd70a7db376f59c5cf414&q=spaghetti")
            .header("X-Mashape-Key", "PyMe0DqaVKmshJHIVjljVczSavCUp1CYb99jsnknSjB0mgWgwa")
            .header("Accept", "application/json")
            .end(function (result) {
              console.log(result.body);
              var data = result.body;
              var recipe = data.q;
              var ingredientArr = data.hits[0].ingredientLines;
              console.log(data.q);
              console.log(ingredientArr);
              //Twillio Stuff goes here

              var twilio = require('twilio');
              // Find your account sid and auth token in your Twilio account Console.
              var client = twilio('AC4978c4f0ae1fdc1e837a879ea9d21f44', '61309043a35db983279062e5c7d8f96d');
               
              // Send the text message.
              client.sendMessage({
                to: '2179798461',
                from: '5035641967',
                body: "hello. This is food tech!"
              });
              context.succeed(
                generateResponse(
                  buildSpeechletResponse("Okay. Texted and added recipe of ${recipe}", true),
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