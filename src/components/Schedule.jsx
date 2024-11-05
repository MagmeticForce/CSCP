import React from 'react';
import Courses from './Courses.jsx';
import courses from '../data/courses.json'; //"courses" is just a variable that stores the data in the .json file.
import { Droppable } from 'react-beautiful-dnd';


export default class Schedule extends React.Component {
    
    render () {
        return (
            <div>
                <Droppable droppableId="schedule_1">
                    {provided => (
                        <div 
                            className="course_schedule"
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {courses.map((course, index) => (
                                <Courses key={course.code} course={course} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

