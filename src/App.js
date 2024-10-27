
import React from 'react';
import Courses from './components/Courses';
import courses from './data/courses.json'; //"courses" is just a variable that stores the data in the .json file.
import './App.css';
import course_planner_page_image from './images/Image_for_Course_Planner_Page.jpg';

function App() {
  
  //This code displays stuff on the page
  //All the "className"s refer to the visual stylings (position, scale, etc) defined in "App.css"
  //The code for displaying each individual course is in 'components/Courses.js'
  return (
    <div className="App">
      <img className="Course-Planner-Page-Image" alt='Stack with books, binder, and notebook.' src={course_planner_page_image}></img>
      <h1>Your Personalized Schedule</h1>
      <h2>Fall 2025</h2>

      <div className="course-list">
        {courses.map(course => (
          <Courses key={course.code} course={course} />
        ))}
      </div>

      <h2>Winter 2026</h2>


    </div>
  );
}

export default App;
