// src/components/ScheduleOutputPage.js
/*import React from 'react';
import { useNavigate } from 'react-router-dom';

function ScheduleOutputPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Schedule Output Page</h1>
      <p>(Will display the generated schedule with drag-and-drop functionality once created)</p>
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
}

export default ScheduleOutputPage;

*/

// src/components/ScheduleOutputPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Courses from './Courses'; // Assuming you have a Course component in the components folder
import courses from '../data/courses.json'; // Assuming courses.json contains the course data
import './ScheduleOutputPage.css';
import course_planner_page_image from '../images/Image_for_Course_Planner_Page.jpg';
import { DragDropContext } from 'react-beautiful-dnd';
import Schedule from '../components/Schedule.jsx';
import withRouter from './withRouter';


class ScheduleOutputPage extends React.Component {
  
  create_navigate () {
    const { navigate } = this.props;
    navigate("/");
  }


  onDragEnd = result => {
    //TODO: add stuff
  };
  
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
        <button onClick={() => this.navigate('/')}>Return Home</button>
      </DragDropContext>
    );
  }
}











  /*
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Computer Science Degree Planner</h1>
      <p>(Displays the generated degree plan)</p>

      {// Render the course list //}
      <div className="course-list">
        {courses.map((course) => (
          <Courses key={course.code} course={course} />
        ))}
      </div>

      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
  */

export default ScheduleOutputPage;

/*Functionality code that kinda works?
import React from 'react';
import { useNavigate } from 'react-router-dom';
import coursesData from '../data/courses.json'; // Adjust path as needed
import { organizeCoursesBySemester } from '../utils/coursePlanner';
import './ScheduleOutputPage.css';


function ScheduleOutputPage() {
  const navigate = useNavigate();

  // Organize courses by semester based on prerequisites
  const semesters = organizeCoursesBySemester(coursesData);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Schedule Output Page</h1>
      <p>(Generated schedule with courses organized by recommended semesters)</p>
      
      {semesters.map((semester, index) => (
        <div key={index} className="semester-section">
          <h2>{semester.semesterName}</h2>
          <ul>
            {semester.courses.map(course => (
              <li key={course.code}>
                <strong>{course.name} ({course.code})</strong><br />
                <em>Difficulty:</em> {course.difficulty} | <em>Hours:</em> {course.hours}<br />
                <p>{course.review}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
}

export default ScheduleOutputPage;
*/