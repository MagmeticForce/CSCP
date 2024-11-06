import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();













/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import backgroundImage from '../src/images/bg01.jpg'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
*/

/*
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
          onClick={() => navigate('/UserInputPage')} // Using navigate to programmatically go to userInputPage
        >
          Get Started!
        </button>
      </div>  
    </div>
  );
}

// UserInputPage component
function UserInputPage() {

  const navigate = useNavigate(); // Hook to get navigation function

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>User Input Page</h1>
      <br></br>
      <br></br>

      <p>Name:</p>
      <br></br>
      <textarea name="name_attribute" class="no-resize"></textarea>
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <p>Incoming Credits:</p>
      <p>(Write only the OU class code for each class you have earned credit for, with one class per line.)</p>
      <br></br>
      <textarea name="incoming_credits_attribute" class="no-resize-tall"></textarea>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <p>[add additional questions below because i know i am forgetting some lol]</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <button
          onClick={() => navigate('/ScheduleOutputPage')} // Using navigate to programmatically return to IntroPage
        >
          Generate Schedule
        </button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <button
          onClick={() => navigate('/')} // Using navigate to programmatically return to IntroPage
        >
          Return Home
        </button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

function ScheduleOutputPage(){
  const navigate = useNavigate();

  return(
    <div style={{ textAlign: 'center', marginTop: '50px' }}>

      <br></br>
      <br></br>
      <h1>Schedule Output Page</h1>
      <p>(Will display the generated schedule with drag-and-drop functionality once created)</p>
      <br></br>
      <br></br>
      <button
          onClick={() => navigate('/')} // Using navigate to programmatically return to IntroPage
        >
          Return Home
        </button>

    </div>
  )

  
}

function SecretPage(){
  return(
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>hi lol</h1>
    </div>
  )
}

// Root component and Router setup
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define the routes }
        <Route path="/" element={<IntroPage />} />
        <Route path="/UserInputPage" element={<UserInputPage />} />
        <Route path="/ScheduleOutputPage" element={<ScheduleOutputPage />} />
        <Route path="/SecretPage" element={<SecretPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

/*
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Import App as the main component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

//reportWebVitals();