import CreateMeeting from '../components/CreateMeeting';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Meetings.module.css';
import axiosInstance from '../utils/axiosInstance';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axiosInstance.get('/api/meetings');
        setMeetings(response.data);
      }catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };
    fetchMeetings();
  }, []);

  const handleNewMeeting = async (newMeeting) => {
    try {
      const res = await axios.post('http://localhost:5000/api/meetings', newMeeting);
      setMeetings([...meetings, res.data.meeting]);  // Add the new meeting to the list
    } catch (err) {
      console.error('Error creating meeting:', err);
    }
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/meetings/${id}`);
      // After deletion, refresh the list
      setMeetings(meetings.filter(meeting => meeting._id !== id));
    } catch (err) {
      console.error('Error deleting meeting:', err);
    }
  };

  return (
    <div className={styles.meetingsWrapper}>
      <h1>Your Meetings</h1>
      {meetings.length > 0 ? (
        <ul>
          {meetings.map(meeting => (
            <li key={meeting._id} className={styles.meetingItem}>
            <div className={styles.meetingTitle}>{meeting.title}</div>
            <p><strong>Meeting Link:</strong> <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">{meeting.meetingLink}</a></p>
            <div>{new Date(meeting.date).toLocaleString()}</div>
            <button onClick={() => handleDelete(meeting._id)}>Delete</button>
          </li>
          ))}
        </ul>
      ) : (
        <p>No meetings scheduled yet.</p>
      )}

      <h2>Schedule a New Meeting</h2>
      <CreateMeeting />
    </div>
  );
};

export default Meetings;
