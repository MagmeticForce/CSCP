
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './components/IntroPage';
import InfoPage from './components/InfoPage';
import UserInputPage from './components/UserInputPage';
import Schedule_Output_Page_With_Wrapper from './components/ScheduleOutputPage';
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
            <Route path="/ScheduleOutputPage" element={<Schedule_Output_Page_With_Wrapper />} />
            <Route path="/InfoPage" element={<InfoPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
