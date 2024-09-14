const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username })
        if (user) return res.status(400).json({ msg: 'User alreaedy exists' });

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
        console.log(err.message);
        res.status(500).send('server error');
    }
});

router.post('/login',async (req, res)=> {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const Matches = await bcrypt.compare(password, user.password);
        if (!Matches) return res.status(400).json({msg:'Incorrect password'});

        const payload = { userId: user.id };
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server error')
    }
});

module.exports = router;