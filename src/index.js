import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import backgroundImage from '../src/images/bg01.jpg'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate

// IntroPage component
function IntroPage() {
  const navigate = useNavigate(); // Hook to get navigation function

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
        <button
          onClick={() => navigate('/page2')} // Using navigate to programmatically go to page2
        >
          Get Started!
        </button>
      </div>  
    </div>
  );
}

// Page2 component
function Page2() {

  const navigate = useNavigate(); // Hook to get navigation function

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>User Input Page</h1>
      <p>insert code for this page:</p>
      <p>- rename to "userInputPage" and allow proper connection from introPage</p>
      <p>- ask user for information</p>
      <p>- read the information, store, and use to generate the schedule</p>
      <p>- link to third page, to be named "scheduleOutputPage"</p>
      <button
          onClick={() => navigate('/')} // Using navigate to programmatically go to page2
        >
          Return Home
        </button>
    </div>
  );
}

// Root component and Router setup
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
