// src/components/Courses.js

// src/components/CourseCard.js

import React from 'react';
import DangerMeter from './DangerMeter'; // Import the DangerMeter component

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h3>{course.name} ({course.code})</h3>
      <p><strong>Description: </strong>{course.description}</p>
      <p><strong>Prerequisites:</strong> {course.prerequisites.length > 0 ? course.prerequisites.join(', ') : "None"}</p>
      <p>
        <strong>Credit Hours:</strong> {course.hours|| "Not Available"}
      </p>
      
      {/* Render the DangerMeter and pass the course code */}
      <DangerMeter courseCode={course.code} />
    </div>
  );
};

export default CourseCard;
