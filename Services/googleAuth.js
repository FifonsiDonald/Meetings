const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5000/auth/oauthcallback'
);
const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar',
];

module.exports = oauth2Client;