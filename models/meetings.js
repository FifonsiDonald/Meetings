const mongoose = require('mongoose');
const MeetingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},//Maybe make an untitled option
    date: {type: String, required: true},
    duration: {type: Number},
    attendees: [{type: String}]
});

module.exports = mongoose.model('Meeting', MeetingSchema);