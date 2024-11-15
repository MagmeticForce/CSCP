// src/components/Courses.js

// src/components/CourseCard.js

import React from 'react';
import DangerMeter from './DangerMeter'; // Import the DangerMeter component
import '../App.css';
import { Draggable } from 'react-beautiful-dnd';


export default class Course extends React.Component {
  render () {
    //Displays the course name (with course code), course description, Prerequisites, and Danger Meter
    //'this.props.course' refers to the 'course' argument that this component takes
    return (
        <Draggable className="draggable" draggableId={this.props.course.code} index={this.props.index}>
          {(provided) => (
            <div
              className="course"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <h3 className="course-code">{this.props.course.code}</h3>
              <h3 className="course-name">{this.props.course.name}</h3>
              <p className="course-description">{this.props.course.description}</p>
              <p className="course-description">Prerequisites: {this.props.course.prerequisites.length > 0 ? this.props.course.prerequisites.join(', ') : "None"}</p>
              {/* Render the DangerMeter and pass the course code */}
              <DangerMeter courseCode={this.props.course.code} className="danger-meter" />
            </div>
          )}
        </Draggable>
    );
  };


}

