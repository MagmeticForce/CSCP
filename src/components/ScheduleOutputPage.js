// src/components/ScheduleOutputPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Courses from './Courses'; // Assuming you have a Course component in the components folder

import './ScheduleOutputPage.css';
import "../App.css";

import { organizeBySemesters, predefinedSemesters } from '../utils/coursePlanner.js'; // Utility function
import course_planner_page_image from '../images/Image_for_Course_Planner_Page.jpg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation, useParams } from 'react-router-dom';

// Wrapper Function for React Router Props
function wrapper_function(Component) {
  function Component_With_Necessary_Props(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} params={params} location={location} />;
  }

  return Component_With_Necessary_Props;
}

// Main Component
class ScheduleOutputPage extends React.Component {
  constructor(props) {
    super(props);

    // Parse query parameters
    const query = new URLSearchParams(this.props.location.search);
    const json_string = query.get('data'); // All courses
    const takenClassesString = query.get('taken'); // Completed courses

    // Convert parsed strings into arrays
    const course_schedule = json_string ? JSON.parse(json_string) : [];
    const takenClasses = takenClassesString ? JSON.parse(takenClassesString) : [];

    // Filter out taken classes
    const filteredCourses = course_schedule.filter(
      (course) => !takenClasses.includes(course.code)
    );

    // Organize filtered courses into predefined semesters
    const groupedSemesters = organizeBySemesters(filteredCourses, predefinedSemesters);
    console.log("Filtered courses:", filteredCourses);
    console.log("Grouped semesters:", groupedSemesters);

        
    // Set state
    this.state = {
      semesters: groupedSemesters,
      takenClasses: takenClasses, // Optional: Track taken classes if needed
    };

    // Bind event handlers
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  // Navigation handler
  handleNavigation = () => {
    const { navigate } = this.props.router;
    navigate('/');
  };

  // Drag-and-drop handler
  onDragEnd(result) {
    const { destination, source } = result;

    if (!destination) return; // If dropped outside a valid area
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return; // If dropped in the same spot

    const sourceSemesterIndex = parseInt(source.droppableId);
    const destinationSemesterIndex = parseInt(destination.droppableId);

    const sourceSemester = Array.from(this.state.semesters[sourceSemesterIndex]);
    const destinationSemester = Array.from(this.state.semesters[destinationSemesterIndex]);

    const [movedCourse] = sourceSemester.splice(source.index, 1);
    destinationSemester.splice(destination.index, 0, movedCourse);

    const updatedSemesters = Array.from(this.state.semesters);
    updatedSemesters[sourceSemesterIndex] = sourceSemester;
    updatedSemesters[destinationSemesterIndex] = destinationSemester;

    this.setState({ semesters: updatedSemesters });
  }

  render() {
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
          <p className='DangerMeter'>Check out our personal reviews for classes with our signature DangerMeter!</p>
          <p className='DangerMeter'>The stars represent course difficulty on a scale on 1-3, you can hover the stars for a more detailed review!</p>
          <p className='DangerMeter'>One star means the class should not be too difficult as long as you do not fall behind</p>
          <p className='DangerMeter'>while three stars means you should buckle up and keep your hands and feet inside the ride at all times!</p>
          <div className='space'></div>
          <div className='space'></div>
          <div className='space'></div>
          <div className='space'></div>

          {/* Render Semesters */}
          {this.state.semesters.map((semester, semesterIndex) => (
            <Droppable key={semesterIndex} droppableId={`${semesterIndex}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="semester-group"
                >
                  <h2>Semester {semesterIndex + 1}</h2>
                  <div className="course-list">
                    {semester.map((course, courseIndex) => (
                      <Draggable key={course.code} draggableId={course.code} index={courseIndex}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="course-card"
                          >
                            <Courses course={course} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    );
  }
}

// Wrapper Assignment
const Schedule_Output_Page_With_Wrapper = wrapper_function(ScheduleOutputPage);
export default Schedule_Output_Page_With_Wrapper;
