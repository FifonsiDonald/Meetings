const { google } = require('googleapis');
const oauth2Client = require('./googleAuth') ;

// Function to create a Google Meet link by scheduling an event
const createGoogleMeetLink = async () => {
  try {
    // OAuth2 client is initialized elsewhere and authorized
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    const event = {
      summary: 'Meeting with Google Meet',
      description: 'This is a Google Meet meeting',
      start: {
        dateTime: '2024-09-14T09:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2024-09-14T10:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      conferenceData: {
        createRequest: {
          requestId: 'randomString',
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      attendees: [{ email: 'example@example.com' }], // Example attendee
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1, // Required for Google Meet link
    });

    // Return the Google Meet link from the event
    return response.data.hangoutLink;
  } catch (err) {
    console.error('Error creating Google Meet event:', err);
    throw new Error('Unable to create Google Meet link');
  }
};

module.exports = { createGoogleMeetLink };
