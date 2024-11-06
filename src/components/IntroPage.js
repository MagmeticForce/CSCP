
// src/components/IntroPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bg01.jpg'; // Ensure this path is correct

function IntroPage() {
  const navigate = useNavigate();

  const style = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  return (
    <div className="intro-page" style={style}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 className="title">CSDP</h1>
        <p className="subtitle">Computer Science Degree Planner</p>
        <button onClick={() => navigate('/UserInputPage')}>Get Started!</button>
      </div>
    </div>
  );
}

export default IntroPage;