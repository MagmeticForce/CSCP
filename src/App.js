
import React from 'react';
import Courses from './components/Courses';
import courses from './data/courses.json';

function App() {
  return (
    <div className="App">
      <h1>Computer Science Degree Planner</h1>
      <div className="course-list">
        {courses.map(course => (
          <Courses key={course.code} course={course} />
        ))}
      </div>
    </div>
  );
}

export default App;
