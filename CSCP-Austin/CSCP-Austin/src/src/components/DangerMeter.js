// src/components/DangerMeter.js


import React, {useState} from "react";
import courseReview from '../data/courses.json';
import './DangerMeter.css';

//DANGER METER
//Shows difficulty of Classes with a one to three star rating
//Returns color based on difficulty
const DangerMeter = ({ courseCode }) => {
    //find the course review based on the course code
    const course = courseReview.find(c => c.code === courseCode);

    //Review on hover
    const[showReview, setShowReview] = useState(false);

    //Function to render the stars based on the difficulty
    const createStars = (difficulty) => {
        let stars = [];
        for (let i = 1; i<= 3; i++){
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= difficulty ? 'filled' : 'empty'}`}
                    onMouseEnter = {() => setShowReview(true)}
                    onMouseLeave={() => setShowReview(false)}
                    >
                      ★  
                    </span>
            );
        }
        return stars;
    };
    if (!course) return <p>Course not found</p>;

    return(
        <div className="danger-meter">
            <h3>{course.name}</h3>
            <div className="stars">
                {createStars(course.difficulty)}
            </div>
            {showReview && <div className="review-popup">{course.review}</div> }
        </div>
    );
};

export default DangerMeter;