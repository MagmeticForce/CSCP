
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './components/IntroPage';
import UserInputPage from './components/UserInputPage';
import ScheduleOutputPage from './components/ScheduleOutputPage';

class App extends React.Component {
  
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
