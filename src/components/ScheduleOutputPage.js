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

function ScheduleOutputPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Computer Science Degree Planner</h1>
      <p>(Displays the generated degree plan)</p>

      {/* Render the course list */}
      <div className="course-list">
        {courses.map((course) => (
          <Courses key={course.code} course={course} />
        ))}
      </div>

      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
}

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