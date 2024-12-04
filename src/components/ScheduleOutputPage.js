// src/components/ScheduleOutputPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Courses from './Courses'; // Assuming you have a Course component in the components folder

import './ScheduleOutputPage.css';
import "../App.css";

import course_planner_page_image from '../images/Image_for_Course_Planner_Page.jpg';
import { DragDropContext } from 'react-beautiful-dnd';
import Schedule from '../components/Schedule.jsx';
import { useLocation, useParams } from 'react-router-dom';
import UserInputPage from './UserInputPage.js';

//Class-based components are incredibly weird and complicated.
//They need these special wrapper functions for some reason.
//This wrapper function in particular is stuff that the
//Return Home button needs, as well as stuff for
//generating the schedule based on the user's input from
//the User Input page. 
function wrapper_function(Component) {
  function Component_With_Necessary_Props(props) { //This function name must be capitalized because it is a React function-based component, and those must start with an uppercase letter according to React syntax.
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} params={params} location={location} />;
  }

  return Component_With_Necessary_Props;
}



class ScheduleOutputPage extends React.Component {

  constructor(props) { 
    super(props); 
    this.state = { 
      courses: [],
      input: []
    };
    //const {courses_to_be_completed} = this.props.params;

    //Convert the transported JSON string from UserInputPage back into
    //a JSON array. 
    const query = new URLSearchParams(this.props.location.search); 
    const json_string = query.get('data'); 
    const string_of_input_from_input_page = query.get('strings');
    const course_schedule = json_string ? JSON.parse(json_string) : [];
    const input_from_input_page = string_of_input_from_input_page ? JSON.parse(string_of_input_from_input_page) : [];

    //console.log("Input from input page at index 0:");
    //console.log(input_from_input_page[0]);

    //console.log("From Schedule Output page: ");
    //console.log(course_schedule[1]);

    //Save the course_schedule to the state
    this.state.courses = course_schedule;
    this.state.input = input_from_input_page;

    this.onDragEnd = this.onDragEnd.bind(this);
    //this.setState({courses: UserInputPage.courses_to_be_completed});
    //console.log(UserInputPage.courses_to_be_completed[1]);
    //console.log(course_data[1]);


  };

  

  //For making the Return Home button work
  handleNavigation = () => {
    //Access the router properties
    const { navigate } = this.props.router;
    navigate('/');
  };








  //Drag-and-drop fun :)
  onDragEnd = result => {
    const {destination, source, draggableId } = result;

    //If the user does not drop in a droppable area, you don't need to do anything
    if (!destination) {return;}

    //If the user drops it back at the location it started at, you don't need to do anything
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {return;}


    //Create a new array with the reordered courses,
    //then update the original course array with the
    //new courses.
    const new_courses = Array.from(this.state.courses); 
    const [moved_course] = new_courses.splice(source.index, 1);  //Removes whatever is at the source index,
                                                                 //Which in this case is the dragged course,
                                                                 //from the array.
    new_courses.splice(destination.index, 0, moved_course); //Adds back the moved course at the destination index.
    this.setState({courses: new_courses}); //Re-renders the courses with the updated array.
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
          <button className="return-home-button" onClick={this.handleNavigation}>Return Home</button>
          <img className="Course-Planner-Page-Image" alt='Stack with books, binder, and notebook.' src={course_planner_page_image}></img>
          <h1>Your Personalized Schedule</h1>
          <div className='space'></div>
          <div className='space'></div>
          <p>Here are the remaining courses that you need to take.</p>
          <p>Click and drag on a course to move it.</p>
          <p>Use this as a tool to create your own personalized schedule for the rest of your time at OU!</p>
          <div className='space'></div>
          <p className='warning'>WARNING: please make sure you are not moving a course before its prerequisites!</p> 
          <p className='warning'>You must take a course’s prerequisites before taking the course itself. </p> 
          <p className='warning'>Always keep an eye on the course prerequisites when dragging-and-dropping courses!</p>
          <div className='space'></div>
          <div className='space'></div>
          <div className='space'></div>
          <div className='space'></div>
          <div className='space'></div>
          <Schedule key="schedule_1" courses={this.state.courses}/>
        </div>
      </DragDropContext>
    );
  }
}

const Schedule_Output_Page_With_Wrapper = wrapper_function (ScheduleOutputPage);
export default Schedule_Output_Page_With_Wrapper;







