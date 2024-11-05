
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import course_planner_page_image from './images/Image_for_Course_Planner_Page.jpg';
import { DragDropContext } from 'react-beautiful-dnd';
import Schedule from './components/Schedule.jsx';


class App extends React.Component {


  onDragEnd = result => {
    //TODO: add stuff
  };
  
  //This code displays stuff on the page
  //All the "className"s refer to the visual stylings (position, scale, etc) defined in "App.css"
  //The code for displaying each individual course is in 'components/Courses.js'
  render () {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <img className="Course-Planner-Page-Image" alt='Stack with books, binder, and notebook.' src={course_planner_page_image}></img>
          <h1>Your Personalized Schedule</h1>
            <h2>Fall 2025</h2>
              <Schedule key="schedule_1" />
            <h2>Winter 2026</h2>
        </div>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

//export default App;
