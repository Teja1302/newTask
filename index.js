// Require the Twilio module
const twilio = require('twilio');


const accountSid = 'ACbe31901128b13a2a6317c946963cc927';
const authToken = 'a7accd3b309e44c1332719406f432dcc';

// Create a Twilio client
const client = new twilio(accountSid, authToken);

// The phone number you want to send the message to (must be verified with Twilio)
const toNumber = '+919043340331';

// The phone number you're sending the message from (provided by Twilio)
const fromNumber = '+13373584329';

// The message you want to send
const message = 'Hello from Twilio!';

// Send the message
client.messages
  .create({
    to: toNumber,
    from: fromNumber,
    body: message
  })
  .then(message => console.log('Message sent successfully!'))
  .catch(error => console.error('Error sending message:', error));
