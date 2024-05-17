
const twilio = require('twilio');

const twilioClient = twilio('process.env.TwiloAccountSID', 'process.env.TwiloAuthToken');

module.exports = twilioClient;
