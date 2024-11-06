import React from 'react';
import { useDrop } from 'react-dnd';
import CourseCard from './Courses'; // Ensure this matches the name of your course card file

const Semester = ({ semesterName, courses, onDropCourse, completedCourses, toggleCompletion }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "COURSE",
        drop: (item) => onDropCourse(item.code, semesterName),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`semester ${isOver ? "hover" : ""}`}>
            <h2>{semesterName}</h2>
            {courses.map((course) => (
                <CourseCard 
                    key={course.code} 
                    course={course} 
                    completedCourses={completedCourses} 
                    toggleCompletion={toggleCompletion} 
                />
            ))}
        </div>
    );
};

export default Semester;