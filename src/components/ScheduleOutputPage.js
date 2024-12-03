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














//Before it renders the courses, it
//goes through the array, compares
//courses with pre-requisites,
//swaps courses if needed,
//then update the state.
//Maybe make a function that organizes it.
//Then every time the "state" updates,
//it runs that function that reorganizes
//the course array.
//The function returns true/false
//based on whether the original array
//got modified. So then before the orignal
//array gets rewritten with the new array,
//store the return value into a variable.
//Then, if it returns "true", maybe a pop-up
//appears with a variable timer. It says: "The 
//courses had to be reordered in order to stay
//consistent with pre-requisites. This means that
//if you tried to move a course elsewhere, it may
//have moved back since you placed it before one of
//its pre-requisites. You must take the pre-requisites
//of a course before you can take the course itself."
//Maybe before it reorders the courses.









        
            /*

            SETUP FOR MOVING COURSES:
            * keywords that it looks for in the strings:
              * if the prerequisite is: MTH, CSI, APM, EGR, STA, WRT, or BIO
              * else if the prerequisite is: Major standing
              * else if the prerequisite is: or
              * else if the prerequisite is: (
              * else if the prerequisite is: )


            CASE ANALYSIS:
            * Suppose [thing1 thing2 thing3] is the course list, where thing1 pre-reqs are: thing2 OR thing3.
              How would the courses be reorganized?
              * We note that the goal is to have either thing2 OR thing3 come before thing1.
              * First, thing2 finds itself inside of thing1's pre-req's
              * But when it finds itself, the new index doesn't immediately update to thing1's location. Instead, 
                it first checks for the "or" prerequisite. This check would be an "if" statement nested inside of
                the "if" statmeent that checks whether it found itself inside another course's prerequisites.
              * In this case, it DOES find the "or" prerequisite. So what happens now is that it looks for thing3, the
                other prerequisite, starting from thing1's index and ending at the start of the array.
              * In this case, it does not find thing3 before thing1. Therefore, it updates the new_index variable to
                thing1's index
              * Finally, the array is spliced once to remove thing2, then spliced again to insert thing2 behind thing1.

            CASE ANALYSIS: 
            * Suppose [thing1 thing2 thing3 thing4] is the course list, where thing1 pre-reqs are: thing2 OR thing3 AND thing4,
              where the student must complete either thing2, or both thing3 and thing4 befroe taking thing1.

            CASE ANALYSIS: 
            * Suppose [thing1 thing2 thing3 thing4 thing5 thing6 thing7] is the course list, where thing1 pre-reqs are: thing2 AND thing3
              AND either thing4, thing5, or thing6, AND thing7
            * This case empahszies the fact that it only checks whether the "or" pre-requisite comes directly after the course name.
            * It also brings up a situation where there is more than 1 "or"'s. This brings up the following fact. thing4 will not 
              find thing5 befroe thing1. But it doens't update to the new_index just yet. Instead, it checks if "or" comes after
              "thing5". In this case, it does, so then it repeats the process, except now with thing6.

            CASE ANALYSIS: 
            * Suppose [thing1 thing2 thing3 thing4 thing5 thing6 thing7] is the course list, where thing1 pre-reqs are:
              thing2 or thing3 AND thing4 or thing5 or thing6 AND thing7.


            CASE ANALYSIS: 
            * Suppose [thing1 thing2 thing3 thing4 thing5 thing6 thing7] is the course list, where thing3's
              pre-requisites are: 

            

            Conclusions from case-analyses:
            * Let CourseA be the course currently being looked at.
            * The program looks at every course behind it, and for each course it looks at, it sees if CourseA is inside of
              its prerequisites.
            * Suppose it runs into CourseB, which has CourseA in its prerequisites.
            * It first checks whether "or" comes directly after the CourseA prerequisite. 
            * If it does, it goes to the next prerequisite, which we'll call CourseC, then it tries finding CourseC, starting from
              CourseB and ending at the start of the array.
            * If it DOES find CourseC before CourseB, CourseA doesn't have to be moved, and it skips to two bullets below.
            * But if it DOESN'T find CourseC before CourseB, then it checks to see if "or" comes after CourseC, and if it does,
              it repeats the previous two bullets as well as this bullet.
            * If "or" does NOT come after CourseC, or if CourseC comes before CourseB, then it proceeds to do this process but backwards: 
              it checks whether "or" is BEHIND CourseA. If so, it goes to the course behind the "or" prereq and tries finding it before CourseB. 
              If it's found before CourseB, then it doesn't have to be moved and skips to the next bullet. But if it isn't foun before CourseB,
              then it see if "or" is behind CourseB and repeats the process.
            * If it couldn't find The new_index is updated, it moves itself
            * If a course had to be moved - which can be determined via the return variable - then the index being looked at gets scanned again, to
              ensure no items are skipped.
            * Lastly, it moves on to the course that comes after CourseA and repeats the whole 
              process.





            
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 1 - prereqs: Course 2 and Couse 3] <--Index being looked at
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 1 - prereqs: Course 2 and Couse 3] <--There are no courses behind Course 1!
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 1 - prereqs: Course 2 and Couse 3]
[Course 2 - prereqs: Course 4] <--Index being looked at++
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 1 - prereqs: Course 2 and Couse 3]
[Course 2 - prereqs: Course 4] <--Now this is the index being looked at
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 1 - prereqs: Course 2 and Couse 3] <--Is Course 2 in your prereqs? Yes, it is!
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 1 - prereqs: Course 2 and Couse 3] <--Is the "or" prereq after Course 2? No, it isn't
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 1 - prereqs: Course 2 and Couse 3] <--Is the "or" prereq behind Course 2? No, it isn't.
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 1 - prereqs: Course 2 and Couse 3] <--Therefore, Course 2 must be moved behind Course 1.
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4] <--Courses were switched, but this is still the index being looked at
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4] <--Courses were switched, so to ensure we don't skip any courses, we can't move down an index yet and instead we must scan the new item in this index, which in this case is Course 2
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4] <--There are no courses behind Course 2!
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 1 - prereqs: Course 2 and Couse 3] <--index being looked at++
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4] 
[Course 1 - prereqs: Course 2 and Couse 3] <--Now this is the index being looked at
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4] <--Is Course 1 in your prereqs? No, it isn't.
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 1 - prereqs: Course 2 and Couse 3] <--Still the index being looked at
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--index being looked at++
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Now this is the index being looked at
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 1 - prereqs: Course 2 and Couse 3] <--Is Course 3 in your prereqs? Yes, it is!
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 1 - prereqs: Course 2 and Couse 3] <--Is the "or" prereq after Course 3? No, it isn't
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 1 - prereqs: Course 2 and Couse 3] <--Is the "or" prereq behind Course 3? No, it isn't
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 1 - prereqs: Course 2 and Couse 3] <--Therefore, Course 3 must move behind this course.
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Courses switched, but still looking at the second index.
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4] <--Is Course 3 in your prereqs? No, it isn't
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]  <--The original index we were looking at. But now Course 1 is in its spot instead of Course 3. Even though we already scanned Course 1, we will do it again, because every time a different item is in the orignal index being looked at, we have to scan it again to ensure we don't skip anything.
[Course 4]
[Course 5]
[Course 6]


Some scanning later...


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] <--Course 1 wasn't found in any of the prereqs of the courses before it.
[Course 4]
[Course 5]
[Course 6]



[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 4] <--Index being loooked at++
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 4] <--Now this is the index being looked at
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] <--Is Course 4 in your pre-reqs? No, it isn't
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Is Course 4 in your pre-reqs? Yes, it is!
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Is the "or" prereq after Course 4? Yes, it is!!
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--This means we must check if Course 5 is before this index.
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4] <--This is not Course 5
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] 
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Course 5 was not found before this index.
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--But is the "or" prereq BEFORE Course 4? No, it isn't.
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 4]
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--This means that Course 4 must be moved before this index.
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 4]
[Course 5]
[Course 6]



[Course 2 - prereqs: Course 4]
[Course 4] <--Still looking at the second index despite courses being moved.
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]


[Course 2 - prereqs: Course 4] <--Is Course 4 in your prereqs? Yes, it is!
[Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]



[Course 2 - prereqs: Course 4] <--Is "or" after Course 4? No. Is "or" before Course 4? No. Therefore, Course 4 must be moved before this course.
[Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]



[Course 4] <--Still looking at the first index.
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]



[Course 4] 
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5] <--This is the original index we were looking at. But now Course 5 is in its spot insetad of Course 4! Becuase the coruse at this index changed, we must scan it.
[Course 6]


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] <--Is Course 5 in your prereqs? No.
[Course 5]
[Course 6]


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Is Course 5 in your prereqs? Yes!
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]



[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Is the "or" prereq after Course5? No.
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Is the "or" prereq before Course5? Yes!
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--That means we must see if Course 4 is before this index.
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]


[Course 4]
[Course 2 - prereqs: Course 4] <--This isn't Coruse 4
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]


[Course 4] <--This IS Course 4!
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Course 4 WAS found before this index! Thus, Course 5 does not have to be moved.
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5]
[Course 6]


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5] <--Original index we were looking at. The course at this index did not change, so we are clear to move on.
[Course 6]


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5] 
[Course 6] <--Index being looked at++


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5] 
[Course 6] <--Now this is the index being looked at.


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] 
[Course 5] <--Is Course 6 in your prereqs? No.
[Course 6] 


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3] <--Is Course 6 in your prereqs? No.
[Course 5] 
[Course 6] 


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Is Course 6 in your prereqs? Yes!
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5] 
[Course 6]



[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Is "or" after Course 6? No. Is "or" before Course 6? No.
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5] 
[Course 6]



[Course 4]
[Course 2 - prereqs: Course 4]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6] <--Therefore, we must move Course 6 before this index.
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5] 
[Course 6]



[Course 4]
[Course 2 - prereqs: Course 4]
[Course 6] <--Still looking at the third index.
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5] 


[Course 4]
[Course 2 - prereqs: Course 4] <--Is Course 6 in your prereqs? No.
[Course 6]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5] 



[Course 4] <--Is Course 6 in your prereqs? No.
[Course 2 - prereqs: Course 4]
[Course 6]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5] 


[Course 4]
[Course 2 - prereqs: Course 4]
[Course 6]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5] <--Oringinal index being looked at. But now a new course is in its spot! Time to scan this new course. (Yes, we already scannned Course 5, but we must always scan the index we were looking at if it changes to ensure we don't skip any courses. Because there could be cases where the new course isn't one we scanned yet, and if we just move to the next index, we'll skip it!)


So then it  checks if all of the courses before Course 5
have Course 5 in their prereqs. It sees that Course 3 has Course 5,
but since "or" comes before it, it checks to see if Course 4
comes before Course 3, and finds that it does, so Course 5
doesn't have to be moved.
[Course 4]
[Course 2 - prereqs: Course 4]
[Course 6]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5]



Aaaand we done! And check it out! All of the courses are ordered based on their prereqs!!!!
[Course 4]
[Course 2 - prereqs: Course 4]
[Course 6]
[Course 3 - prereqs: Course 4 or Course 5 and Course 6]
[Course 1 - prereqs: Course 2 and Couse 3]
[Course 5]



So, here is an outline of the code:
* boolean the_course_needs_to_be_moved = false
* boolean a_course_has_been_moved = false
* boolean course_is_major_standing = false
* int new_index = 0
* while loop that goes through every index of the course array,
  starting at the beginning of the array and ending at the end
  of the array
  * loop that goes through every index behind
    course_array[index_being_looked_at], starting
    at index_being_looked_at-1 and ending
    at the start of the array
      * loop that goes through the prerequisites of
        the course at 
        course_array[previous_index_being_looked_at]
        * if the prerequisite at 
          prerequisites[prereq_index_being_looked_at] ==
          the course code of the course at 
          course_array[index_being_looked_at]
            * prereq_index_being_looked_at_2 = prereq_index_being_looked_at
            * the_course_needs_to_be_moved = true
            * while loop that runs while 
              prereq_index_being_looked_at_2 + 1 < prerequisites.length
              and prerequisites[prereq_index_being_looked_at_2 + 1] == "or"
              * the_course_needs_to_be_moved = false
              * prereq_index_being_looked_at_2 = prereq_index_being_looked_at_2 + 2
              * previous_index_being_looked_at_2 = previous_index_being_looked_at - 1
              * while loop that runs while previous_index_being_looked_at_2 >= 0
                * if prerequisites[prereq_index_being_looked_at_2] ==
                  course code of course at course_array[previous_index_being_looked_at_2]
                  * the_course_needs_to_be_moved = false
                  * break
                * else the_course_needs_to_be_moved = true
                * previous_index_being_looked_at_2--
            * prereq_index_being_looked_at_2 = prereq_index_being_looked_at
            * while loop that runs while prereq_index_being_looked_at_2 - 1 >= 0
              and prerequisites[prereq_index_being_looked_at_2 - 1] == "or"
              * prereq_index_being_looked_at_2 = prereq_index_being_looked_at_2 - 2
              * previous_index_being_looked_at_2 = previous_index_being_looked_at - 1
              * while loop that runs while previous_index_being_looked_at_2 >= 0
                * if prerequisites[prereq_index_being_looked_at_2] ==
                  course code of course at course_array[previous_index_being_looked_at_2]
                  * the_course_needs_to_be_moved = false
                  * break
                * else the_course_needs_to_be_moved = true
                * previous_index_being_looked_at_2--
    * if the_course_needs_to_be_moved
      * move the course to course_array[previous_index_being_looked_at]
      * the_course_needs_to_be_moved = false
      * a_course_has_been_moved = true
  * previous_index_being_looked_at = index_being_looked_at - 1 //new part: now we will check for major standing
  * //first, see if the course we're currently looking at is major standing
  * loop that goes through every index of the prerequisites of 
    the course at course_array[index_being_looked_at]
    * if "major standing" is at the index being looked at on this iteration
      * course_is_major_standing = true and break
  * if !course_is_major_standing
    * while previous_index_being_looked_at >= 0 //check to see if the any any major standing courses behind it
      * loop that scans every index of prerequisites of course at course_array[previous_index_being_looked_at]
        * if "major standing" is at the index being looked at on this iteration
            * the_course_needs_to_be_moved = true
            * new_index = previous_index_being_looked_at
      * previous_index_being_looked_at--
  * if the_course_needs_to_be_moved
    * move the course to course_array[new_index]
    * the_course_needs_to_be_moved = false
    * a_course_has_been_moved = true
  * if !a_course_has_been_moved
    * index_being_looked_at++
  * a_course_has_been_moved = false //here, we start resetting things for the next iteration of our grand loop
  * the_course_needs_to_be_moved = false
  * course_is_major_standing = false
  * int new_index = 0
          
        





          Old notes:
            * Major standing is taken care of first - if 
              a course is being looked at and doesn't have 
              "major standing" in its string, and if a course 
              behind it DOES have "major standing" in its 
              string, then the new_index is the course with
              "major standing"
            * Then, it checks for other pre-requisites.
            * Some coruses are treated in a unique way due to their lengthy
              pre-requisite description
                * CHM 1440: if MTH 0662 exists, and this course is before it,
                  it will move behind it
                * PHY 1510: MTH 1554  
            * Inside of each "if" statement described above, it sets
              the return variable to true since it had to change the
              course ordering


            Regarding the pop-up if you drag-and-drop a course in an
            invalid spot causing it to reorganize the courses:
            "This migth be a bit different than how we originally imagined it,
            but I think this new thing will still work out. It makes it more
            unqiue from the other schedule planner."

            

            */






//Also, masybe once Jacob finishes with user-input
//stuff, code can be added that removes the courses that
//have already been taken.

//Don't be afraid to DM Austin or the other
//group members if you are stuck on anything.
//Also you can ask Copilot.

















/*Functionality code that kinda works?
import React from 'react';
import { useNavigate } from 'react-router-dom';
import coursesData from '../data/courses.json'; // Adjust path as needed
import { organizeCoursesBySemester } from '../utils/coursePlanner';
import './ScheduleOutputPage.css';


function ScheduleOutputPage() {
  const navigate = useNavigate();

  // Organize courses by semester based on prerequisites
  const semesters = organizeCoursesBySemester(coursesData);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Schedule Output Page</h1>
      <p>(Generated schedule with courses organized by recommended semesters)</p>
      
      {semesters.map((semester, index) => (
        <div key={index} className="semester-section">
          <h2>{semester.semesterName}</h2>
          <ul>
            {semester.courses.map(course => (
              <li key={course.code}>
                <strong>{course.name} ({course.code})</strong><br />
                <em>Difficulty:</em> {course.difficulty} | <em>Hours:</em> {course.hours}<br />
                <p>{course.review}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
}

export default ScheduleOutputPage;
*/