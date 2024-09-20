// const express = require('express');
// const router = express.Router();
// const Meeting = require('../models/meetings');
// const { createGoogleMeetLink } = require('../Services/googleMeetService');

// // Route to create a meeting
// router.get('/meetings', async (req, res) => {
//     console.log('Create meeting request received');
//   const { title, description, date, duration, participants, platform } = req.body;
//   const userId = req.user.id;  // Assuming authentication middleware has set the user

//   try {
//     let meetingLink = '';

//     // Generate meeting link based on platform
//     if (platform === 'google') {
//       meetingLink = await createGoogleMeetLink();
//     } else if (platform === 'zoom') {
//       meetingLink = await createZoomLink();
//     }

//     const meeting = new Meeting({
//       title,
//       description,
//       date,
//       duration,
//       participants,
//       createdBy: userId,
//       platform,
//       meetingLink,
//     });

//     await meeting.save();
//     res.json({ meeting });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Meeting = require('../models/meetings');
const { createGoogleMeetLink } = require('../Services/googleMeetService');
const authMiddleware = require('../middleware/auth');

// Route to create a meeting
router.post('/meetings', async (req, res) => {
  console.log('Create meeting request received');
  const { title, description, date, duration, participants, platform } = req.body;
  const userId = req.user;

  try {
    let meetingLink = '';

    // Generate meeting link based on platform
    if (platform === 'google') {
      meetingLink = await createGoogleMeetLink();
    } else if (platform === 'zoom') {
      // Logic to generate a Zoom meeting link (you can define a service for this)
      meetingLink = await createZoomLink();
    }

    const meeting = new Meeting({
      title,
      description,
      date,
      duration,
      participants,
      createdBy: userId,
      platform,
      meetingLink,
    });

    await meeting.save();
    res.status(201).json({ meeting });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to fetch all meetings created by a user
router.get('/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find(); // Fetch all meetings
    res.json(meetings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to delete a meeting by ID
router.delete('/meetings/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ msg: 'Meeting not found' });

    await meeting.deleteOne()
    res.json({ msg: 'Meeting removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
