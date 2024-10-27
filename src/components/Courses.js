// src/components/Courses.js

// src/components/CourseCard.js

import React from 'react';
import DangerMeter from './DangerMeter'; // Import the DangerMeter component
import '../App.css';

const CourseCard = ({ course }) => {
  


  /* TO-DO: add row and column dividers
    
    It almost works:
    
    In App.css, commment-out the "WITHOUT ROW AND COLUMN DIVIDERS"
    section, and uncomment the "WITH ROW AND COLUMN DIVIDERS"
    section.

    Then, copy the following code below, and paste
    it above <h3 className="course-code">{course.code}</h3>
    in the "return" statement:
  
    <div className="column-divider-1"></div>
    <div className="column-divider-2"></div>
    <div className="column-divider-3"></div>
    <div className="row-divider"></div>

    You'll see that it almost works, but there
    is a large gap between each row.

    You might think absolute positioning will
    fix the issue, but then every time you
    add a new course, the new row and column
    dividers will be in the exact same spot
    as the first row and column dividers.
    The new row and column dividers will
    overlap the first ones, in other words.

    You can try moving everything upwards
    using App.css, but that might move the gaps
    upwards too.

  */


  //Displays the course name (with course code), course description, Prerequisites, and Danger Meter
  return (
    <div>
      <h3 className="course-code">{course.code}</h3>
      <h3 className="course-name">{course.name}</h3>
      <p className="course-description">{course.description}</p>
      <p className="course-description">Prerequisites: {course.prerequisites.length > 0 ? course.prerequisites.join(', ') : "None"}</p>
      {/* Render the DangerMeter and pass the course code */}
      <DangerMeter courseCode={course.code} className="danger-meter" />
    </div>
  );
};

export default CourseCard;
