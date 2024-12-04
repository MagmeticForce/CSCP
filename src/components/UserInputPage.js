// src/components/UserInputPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import inital_course_data from '../data/courses.json'; // Assuming courses.json contains the course data
import { gatherAllPrerequisites } from '../utils/coursePlanner.js';

function UserInputPage() {
  const [input_from_input_page, set_input_from_input_page] = useState([]);
  const [live_input, set_live_input] = useState(''); // To store user input in real-time
  const [courses_to_be_completed, set_courses_to_be_completed] = useState([]);

  // Loads the .json elements into the array "courses_to_be_completed"
  useEffect(() => {
    set_courses_to_be_completed(JSON.parse(JSON.stringify(inital_course_data))); // Copy the JSON data into the state
  }, []);

  const navigate = useNavigate();

  // Updates the live_input with the user's input in real-time
  const record_the_changed_input = (event) => {
    set_live_input(event.target.value);
  };

  // Handles adding completed courses and their prerequisites
  const handleAddCompletedCourseButtonClick = () => {
    const course = courses_to_be_completed.find((c) => c.code === live_input);

    if (!course) {
      alert("Course not found!");
      return;
    }

    // Gather all prerequisites for the course
    const prerequisites = gatherAllPrerequisites(live_input, courses_to_be_completed);

    // Add the course and its prerequisites to completed courses
    const newCompletedCourses = [...input_from_input_page, live_input, ...prerequisites];

    // Remove completed courses from the "to be completed" list
    const updatedCoursesToBeCompleted = courses_to_be_completed.filter(
      (c) => !newCompletedCourses.includes(c.code)
    );

    set_input_from_input_page(newCompletedCourses); // Update completed courses
    set_courses_to_be_completed(updatedCoursesToBeCompleted); // Update remaining courses
    set_live_input(''); // Clear input field
  };

  // Generates the schedule and navigates to ScheduleOutputPage
  const handle_generate_schedule_button_click = () => {
    const json_string = JSON.stringify(courses_to_be_completed);
    const string_of_input_from_input_page = JSON.stringify(input_from_input_page);

    navigate(
      `/ScheduleOutputPage?data=${encodeURIComponent(json_string)}&taken=${encodeURIComponent(
        string_of_input_from_input_page
      )}`
    );
  };

  return (
    <>
      <div className="top-bar"></div>
      <div className="top-bar"></div>
      <div className="top-bar"></div>
      <div className="top-bar"></div>
      <h2 className="top-bar-text">Oakland University CSDP</h2>
      <button className="return-home-button" onClick={() => navigate('/')}>Return Home</button>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Your Incoming Credits</h1>
      </div>

      <div style={{ textAlign: 'left', marginLeft: '12px' }}>
        <p>Refer to the "Courses to Be Completed" list (below).</p>
        <p>For each course in that list that you have already earned credit for, write its course code in the text box and press the "Add Completed Course" button.</p>
        <p>When you are done adding all of the courses you've already earned credit for, press the "Generate Schedule" button.</p>
        <p>To reset everything back to the way it was, refresh this page.</p>
        <p>In order for the CSDP to work properly, please follow these simple rules:</p>
      </div>
      <div style={{ textAlign: 'left', marginLeft: '25px' }}>
        <ul>
          <li>Only enter one course code at a time in the text box.</li>
          <li>Put a space between the letters and numbers of each course code. Example: MTH 1554</li>
        </ul>
      </div>
      <div style={{ textAlign: 'left', marginLeft: '12px' }}>
        <input
          type="text"
          placeholder="Enter course codes..."
          value={live_input}
          onChange={record_the_changed_input}
        />
        <div className="space"></div>
        <button onClick={handleAddCompletedCourseButtonClick}>Add Completed Course</button>
        <div className="space"></div>
        <button onClick={handle_generate_schedule_button_click}>Generate Schedule</button>
        <h2>Completed Courses:</h2>
      </div>
      <div style={{ textAlign: 'left', marginLeft: '25px' }}>
        <ul>{input_from_input_page.map((item, index) => (<li key={index}>{item}</li>))}</ul>
      </div>
      <div style={{ textAlign: 'left', marginLeft: '12px' }}>
        <h2>Courses to Be Completed:</h2>
      </div>
      <div style={{ textAlign: 'left', marginLeft: '25px' }}>
        <ul>
          {courses_to_be_completed.map((item, index) => (
            <li key={index}>
              {item.name} ({item.code})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UserInputPage;
