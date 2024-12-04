// src/components/Courses.js

import React from 'react';
import DangerMeter from './DangerMeter'; // Import the DangerMeter component

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h3>{course.name} ({course.code})</h3>
      <p>
        <strong>Description: </strong>
        {course.link ? (
          <a href={course.link} target="_blank" rel="noopener noreferrer">
            {course.description || "Learn more about this course"}
          </a>
        ) : (
          course.description || "No description available."
        )}
      </p>
      <p>
        <strong>Prerequisites:</strong> 
        {course.prerequisites && course.prerequisites.length > 0
          ? course.prerequisites.join(', ')
          : "None"}
      </p>
      <p>
        <strong>Credit Hours:</strong> {course.hours || "Not Available"}
      </p>
      {/* Render the DangerMeter and pass the course code */}
      <DangerMeter courseCode={course.code} />
    </div>
  );
};

export default CourseCard;
