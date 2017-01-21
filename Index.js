/**
after installing node.js and getting into the right directory
put this in terminal:
npm install twilio
node index.js
**/

var twilio = require('twilio');
 
// Find your account sid and auth token in your Twilio account Console.
var client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
 
// Send the text message.
client.sendMessage({
  to: 'Your_Number',
  from: 'Twilio_number',
  body: 'Ahoyy from Twilio!'
});