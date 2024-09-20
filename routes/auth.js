const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const oauth2Client = require('../Services/googleAuth');



router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // let user = await User.findOne({ username })
        // if (user) return res.status(400).json({ msg: 'User alreaedy exists' });

        user = new User({ username, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { userId: user.id };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.log(req.body); // Log request body to check the incoming data
        console.error('Error details:', err);
        console.log(err.message);
        res.status(500).send('server error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const Matches = await bcrypt.compare(password, user.password);
        if (!Matches) return res.status(400).json({ msg: 'Incorrect password' });

        const payload = { userId: user.id };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error')
    }
});

router.get('/google-register', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    });
    res.redirect(url);
});


router.get('/oauthcallback', async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oauth2Client.getToken(code)  // Exchange the code for tokens
        oauth2Client.setCredentials(tokens);                   // Set the tokens for the client
        res.cookie('google_token', tokens);

        // Save the refresh token securely (e.g., in the database or cookie)
        // Only save if there's a refresh token available
        if (tokens.refresh_token) {
            res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
        }
        const userInfo = await oauth2Client.request({ url: 'https://www.googleapis.com/oauth2/v1/userinfo' });
        const payload = { userId: userInfo.data.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        //log user details
        console.log("User Info: ", userInfo.data);
        //redirect into app
        res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
    } catch (error) {
        console.error('Error exchanging token:', error.response.data || error);
        res.status(500).json({ error: 'Failed to exchange token' });
    }
});

module.exports = router;