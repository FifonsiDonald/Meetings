require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const authRoutes = require('./routes/auth');
const meetingroutes = require('./routes/Meetings')

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send("backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('server running on port '+PORT);
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const userModel = new mongoose.model("users", userSchema);

app.get('/getUsers', async (req,res) => {
    const userData = await userModel.find();
    res.json(userData);
});

app.use('/auth', authRoutes);

app.use('/api', meetingroutes);