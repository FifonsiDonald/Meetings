const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,  // Duration in minutes
    required: true,
  },
  participants: {
    type: [String],  // Array of email addresses or user IDs
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  platform: {
    type: String,  // Zoom, Google Meet, etc.
    required: true,
  },
  meetingLink: {
    type: String,  // Generated meeting link
  },
});

module.exports = mongoose.model('Meeting', MeetingSchema);
