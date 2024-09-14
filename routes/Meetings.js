const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Meetings = require('../models/meetings');

router.post('/', auth, async (req, res) => {
    const { title, platform, date } = req.body;
    try {
        const meeting = new meetings({
            userId: req.user,
            title,
            platform,
            date,
        });
        await meeting.save();
        res.json(meeting);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const meetings = await Meetings.find({ userId: req.user });
        res.json(meetings);
    } catch (err) {
        res.status(500).send('Server error')
    }
});

module.exports = router;