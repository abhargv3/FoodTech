var accountSid = 'AC5b147772a8494886a6f9096133407dcd';
var authToken = '9a58a46e6f5868841642cb7e98a765be';


//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
	to: "+12179798461", 
	from: "+12175744245",    
}, function(err, message) { 
	console.log(message.sid); 
});