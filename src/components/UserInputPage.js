// src/components/UserInputPage.js
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import inital_course_data from '../data/courses.json'; // Assuming courses.json contains the course data

function UserInputPage() {

  //Debug notes
  //upon returning to this page:
  //maintains courses_to_be_completed
  //fogets input_from_input_page
  //Tghe JSON is literally getting changed. This could be the cause of the issue!







  const [input_from_input_page, set_input_from_input_page] = useState([]);
  const [live_input, set_live_input] = useState(''); //This variable will be used for storing whatever the user inputs
                                                    //We will set it up so that every time the user types something
                                                    //in the input field, it gets saved into this "live_input" state variable
  const [courses_to_be_completed, set_courses_to_be_completed] = useState([]);

  /*
  componentDidMount() { 
    //Load the items from the JSON file into the state 
    this.setState({ courses_to_be_completed: inital_course_data }, () => {
      console.log(inital_course_data[1]);
      console.log(this.state.courses[1]);
    });

  }
  */

  //Loads the .json elements into the array "courses_to_be_completed"
  useEffect(() => { 
    set_courses_to_be_completed(JSON.parse(JSON.stringify(inital_course_data))); //Now a copy of the JSON is linked to the "courses_to_be_completed"
    console.log ("Original JSON data at index 0:");
    console.log (inital_course_data[0]);
    console.log ("Modified JSON data at index 0:");
    console.log (courses_to_be_completed[0]);
  }, []);


  const navigate = useNavigate();

  const record_the_changed_input = (event) => { //Gets called every time the user makes a change to their input
    //Save the changed input into the live_input variable.
    //This makes it so that it records the user's input
    //in real-time, hence why it's called "live_input".
    set_live_input(event.target.value);
    //console.log (live_input);
  }
  
  const handle_add_completed_course_button_click = () => {
    //Remove the course that the user inputted from the "Courses to Be Completed" list
    //This is done by going through the list of Courses to Be Completed, finding the index
    //that matches the user's input, and removing the course at that index.
    courses_to_be_completed.map ((item, index) => {
      if (item.code === live_input) {
        courses_to_be_completed.splice(index, 1);
      }
    });

    console.log("Original JSON data at index 0:")
    console.log (inital_course_data[0]);
    console.log("Modified JSON data at index 0:")
    console.log (courses_to_be_completed[0]);

    set_input_from_input_page([...input_from_input_page, live_input]); //Adds a new index that contains the completed course that the user inputted.
    set_live_input(''); //makes the input field blank after the user adds a completed course.
    //console.log(input_from_input_page[0]);
    //input_from_input_page.map (item => (console.log(item))); //Baiscally displays the input in the console.
  }

  const handle_generate_schedule_button_click = () => { 
    //console.log("From User Input page: ");
    //console.log(courses_to_be_completed[1]);

    //Convert the JSON array "courses_to_be_completed" into a stirng
    //so that it can be transported to the ScheduleOutPutPage
    //properly.
    const json_string = JSON.stringify(courses_to_be_completed);
    const string_of_input_from_input_page = JSON.stringify(input_from_input_page);
    navigate(`/ScheduleOutputPage?data=${encodeURIComponent(json_string)}&strings=${encodeURIComponent(string_of_input_from_input_page)}`);
    //navigate(`/ScheduleOutputPage/${courses_to_be_completed}`);
  }

/* 

<p>Name:</p>
<div className='space'></div>
<textarea name="name_attribute" className="no-resize"></textarea>

*/

//<textarea name="incoming_credits_attribute" className="no-resize-tall" ></textarea>

  return (

    <>
      <div className="top-bar"></div>
      <div className="top-bar"></div>
      <div className="top-bar"></div>
      <div className="top-bar"></div>
      <h2 className="top-bar-text">Oakland University CSDP</h2>
      <button className='return-home-button' onClick={() => navigate('/')}>Return Home</button>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Your Incoming Credits</h1>
      </div>
      
        <div className='space'></div>
        <div className='space'></div>
        <div className='space'></div>
        <div className='space'></div>
        <div className='space'></div>
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
        <input type="text" placeholder='Enter course codes...' value={live_input} onChange={record_the_changed_input}/>
        <div className='space'></div>
        <button onClick={handle_add_completed_course_button_click}>Add Completed Course</button>
        <div className='space'></div>
        <button onClick={handle_generate_schedule_button_click}>Generate Schedule</button>
        <h2>Completed Courses: </h2>
      </div>
      <div style={{ textAlign: 'left', marginLeft: '25px' }}>
        <ul>{input_from_input_page.map((item, index) => (<li key={index}>{item}</li>))}</ul>
        <div className='space'></div>
        <div className='space'></div>
        <div className='space'></div>
      </div>
      <div style={{ textAlign: 'left', marginLeft: '12px' }}>
        <h2>Courses to Be Completed:</h2>
      </div>
      <div style={{ textAlign: 'left', marginLeft: '25px' }}>
        <ul>{courses_to_be_completed.map((item, index) => (<li key={index}>{item.name} ({item.code})</li>))}</ul>
      </div>
    </>
  );
}


export default UserInputPage;