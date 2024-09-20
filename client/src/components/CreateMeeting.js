// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateMeeting = () => {
//   const [title, setTitle] = useState('');
//   const [platform, setPlatform] = useState('');
//   const [date, setDate] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     try {
//       await axios.post('/api/meetings', { title, platform, date }, {
//         headers: { 'x-auth-token': token }
//       });
//       alert('Meeting created!');
//     } catch (error) {
//       console.error(error);
//       alert('Error creating meeting');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Platform</label>
//         <select
//           value={platform}
//           onChange={(e) => setPlatform(e.target.value)}
//           required
//         >
//           <option value="Google Meet">Google Meet</option>
//           <option value="Zoom">Zoom</option>
//           <option value="WhatsApp">WhatsApp</option>
//           <option value="Telegram">Telegram</option>
//         </select>
//       </div>
//       <div>
//         <label>Date</label>
//         <input
//              type="datetime-local"
//              value={date}
//              onChange={(e) => setDate(e.target.value)}
//              required
//            />
//          </div>
//          <button type="submit">Create Meeting</button>
//        </form>
//      );
//    };

//    export default CreateMeeting;
// import React, { useState } from 'react';

// const CreateMeeting = () => {
//   const [meetingData, setmeetingData] = useState({
//     title: '',
//     description: '',
//     date: '',
//     duration: '',
//     participants: '',
//     platform: 'google',  // Default platform
//   });

//   const { title, description, date, duration, participants, platform } = meetingData;

//   const onChange = (e) => {
//     setmeetingData({ ...meetingData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     console.log('doing');
//     e.preventDefault();
//     try {
//       console.log('doing');
//       const res = await fetch('http://localhost:5000/api/meetings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ title, description, date, duration, participants: participants.split(','), platform }),
//       });
//       const data = await res.json();
//       console.log('Meeting created:', res.data);
//       if (res.ok) {
//         alert('Meeting created successfully!');
//         console.log(data.meeting);
//       } else {
//         alert('Failed to create meeting');
//         console.log(data);
//       }
//     } catch (error) {
//       console.error('Error creating meeting:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create a Meeting</h2>
//       <form onSubmit={onSubmit}>
//         <div>
//           <label>Title</label>
//           <input type="text" name="title" value={title} onChange={onChange} required />
//         </div>
//         <div>
//           <label>Description</label>
//           <input type="text" name="description" value={description} onChange={onChange} />
//         </div>
//         <div>
//           <label>Date</label>
//           <input type="datetime-local" name="date" value={date} onChange={onChange} required />
//         </div>
//         <div>
//           <label>Duration (minutes)</label>
//           <input type="number" name="duration" value={duration} onChange={onChange} required />
//         </div>
//         <div>
//           <label>Participants (comma-separated emails)</label>
//           <input type="text" name="participants" value={participants} onChange={onChange} required />
//         </div>
//         <div>
//           <label>Platform</label>
//           <select name="platform" value={platform} onChange={onChange}>
//             <option value="google">Google Meet</option>
//             <option value="zoom">Zoom</option>
//             {/* Add options for other platforms like WhatsApp, Telegram */}
//           </select>
//         </div>
//         <button type="submit">Create Meeting</button>
//       </form>
//     </div>
//   );
// };

// export default CreateMeeting;
import axios from 'axios';
import { useState } from 'react';

const token = localStorage.getItem('token');

const CreateMeeting = ({ handleNewMeeting }) => {
  const [meetingData, setMeetingData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    participants: '',
    platform: 'google',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const participantsArray = meetingData.participants //.split(',').map(participant => participant.trim());
    // handleNewMeeting({ ...meetingData, participants: participantsArray });
    const newMeeting = {
      ...meetingData,
      participants: participantsArray
  };
    console.log('Submitted meeting data:', meetingData);

    try {
      const response = await axios.post('http://localhost:5000/api/meetings', meetingData);
      console.log('Meeting created:', response.data);
      // Handle success (e.g., redirect or display a message)
    } catch (err) {
      console.error('Error creating meeting:', err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={e => setMeetingData({ ...meetingData, title: e.target.value })} />
      <input type="text" placeholder="Description" onChange={e => setMeetingData({ ...meetingData, description: e.target.value })} />
      <input type="datetime-local" onChange={e => setMeetingData({ ...meetingData, date: e.target.value })} />
      <input type="number" placeholder="Duration (minutes)" onChange={e => setMeetingData({ ...meetingData, duration: e.target.value })} />
      <input type="text" placeholder="Participants (comma separated emails)" onChange={e => setMeetingData({ ...meetingData, participants: e.target.value.split(',') })} />
      <select onChange={e => setMeetingData({ ...meetingData, platform: e.target.value })}>
        <option value="google">Google Meet</option>
        <option value="zoom">Zoom</option>
      </select>
      <button type="submit">Create Meeting</button>
    </form>
  );
};

export default CreateMeeting;
