// src/components/UserInputPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserInputPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>User Input Page</h1>
      <p>Name:</p>
      <textarea name="name_attribute" className="no-resize"></textarea>
      
      <p>Incoming Credits:</p>
      <p>(Write only the OU class code for each class you have earned credit for, with one class per line.)</p>
      <textarea name="incoming_credits_attribute" className="no-resize-tall"></textarea>
      
      <button onClick={() => navigate('/ScheduleOutputPage')}>Generate Schedule</button>
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
}

export default UserInputPage;