
/*
import React from 'react';
import Courses from './components/Courses';
import courses from './data/courses.json';

function App() {
  return (
    <div className="App">
      <h1>Computer Science Degree Planner</h1>
      <div className="course-list">
        {courses.map(course => (
          <Courses key={course.code} course={course} />
        ))}
      </div>
    </div>
  );
}

export default App;



// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './IntroPage'; // Make sure these imports match the file paths
import UserInputPage from './UserInputPage';
import ScheduleOutputPage from './ScheduleOutputPage';
import SecretPage from './SecretPage';
import Courses from './components/Courses';
import courses from './data/courses.json';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/UserInputPage" element={<UserInputPage />} />
          <Route path="/ScheduleOutputPage" element={<ScheduleOutputPage />} />
          <Route path="/SecretPage" element={<SecretPage />} />
          {/* You can add more components here if needed }
        </Routes>
        <div className="course-list">
          {courses.map(course => (
            <Courses key={course.code} course={course} />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
*/

// App.js
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './components/IntroPage';
import UserInputPage from './components/UserInputPage';
import ScheduleOutputPage from './components/ScheduleOutputPage';

import courses from './data/courses.json'; //"courses" is just a variable that stores the data in the .json file.

class App extends React.Component {

  state = courses;
  
  //This code displays stuff on the page
  //All the "className"s refer to the visual stylings (position, scale, etc) defined in "App.css"
  //The code for displaying each individual course is in 'components/Courses.js'
  render () {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/UserInputPage" element={<UserInputPage />} />
            <Route path="/ScheduleOutputPage" element={<ScheduleOutputPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

