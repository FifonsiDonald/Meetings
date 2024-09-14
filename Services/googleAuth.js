const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
    proces.envGOOGLE_CLIENT_ID,
    process.env,envGOOGLE_CLIENT_SECRET,
    'http://localhost:5000/api/google/callback'
);

module.exports = oauth2Client;