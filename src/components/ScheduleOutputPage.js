// src/components/ScheduleOutputPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Courses from './Courses'; // Assuming you have a Course component in the components folder
import course_data from '../data/courses.json'; // Assuming courses.json contains the course data
import './ScheduleOutputPage.css';
import course_planner_page_image from '../images/Image_for_Course_Planner_Page.jpg';
import { DragDropContext } from 'react-beautiful-dnd';
import Schedule from '../components/Schedule.jsx';
import { useLocation, useParams } from 'react-router-dom';

//For making the Return Home button work
function withRouter(Component) {
  function ComponentWithRouterProps(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProps;
}

class ScheduleOutputPage extends React.Component {

  constructor(props) { 
    super(props); 
    this.state = { 
      courses: [] 
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    console.log(course_data[1]);
  };

  componentDidMount() { 
    //Load the items from the JSON file into the state 
    this.setState({ courses: course_data }, () => {
      console.log(course_data[1]);
      console.log(this.state.courses[1]);
    });
  }

  //For making the Return Home button work
  handleNavigation = () => {
    // Access the router properties
    const { navigate } = this.props.router;
    navigate('/');
  };

  onDragEnd = result => {
    const {destination, source, draggableId } = result;

    //If the user does not drop in a droppable area, you don't need to do anything
    if (!destination) {return;}

    //If the user drops it back at the location it started at, you don't need to do anything
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {return;}


    const new_courses = Array.from(this.state.courses); 
    const [moved_course] = new_courses.splice(source.index, 1); 
    new_courses.splice(destination.index, 0, moved_course);
    this.setState({courses: new_courses});
  };

  render () {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <div className="top-bar"></div>
          <div className="top-bar"></div>
          <div className="top-bar"></div>
          <div className="top-bar"></div>
          <h2 className="top-bar-text">Oakland University CSDP</h2>
          <img className="Course-Planner-Page-Image" alt='Stack with books, binder, and notebook.' src={course_planner_page_image}></img>
          <h1>Your Personalized Schedule</h1>
            <h2>Fall 2025</h2>
              <Schedule key="schedule_1" courses={this.state.courses}/>
            <h2>Winter 2026</h2>
        </div>
        <button className="return-home-button" onClick={this.handleNavigation}>Return Home</button>
      </DragDropContext>
    );
  }
}

export default withRouter (ScheduleOutputPage);


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