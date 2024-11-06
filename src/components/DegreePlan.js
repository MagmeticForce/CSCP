import React from 'react';

const degreePlan = [
  {
    id: "100",
    year: "FRESHMAN",
    semesters: [
      { id: "1", semesterName: "Fall semester", courses: [] },
      { id: "2", semesterName: "Spring semester", courses: [] },
      { id: "12", semesterName: "Summer semester", courses: [] }
    ]
  },
  {
    id: "200",
    year: "SOPHOMORE",
    semesters: [
      { id: "3", semesterName: "Fall semester", courses: [] },
      { id: "4", semesterName: "Spring semester", courses: [] },
      { id: "11", semesterName: "Summer semester", courses: [] }
    ]
  },
  {
    id: "300",
    year: "JUNIOR",
    semesters: [
      { id: "5", semesterName: "Fall semester", courses: [] },
      { id: "6", semesterName: "Spring semester", courses: [] },
      { id: "10", semesterName: "Summer semester", courses: [] }
    ]
  },
  {
    id: "400",
    year: "SENIOR",
    semesters: [
      { id: "7", semesterName: "Fall semester", courses: [] },
      { id: "8", semesterName: "Spring semester", courses: [] },
      { id: "9", semesterName: "Summer semester", courses: [] }
    ]
  }
];

const DegreePlan = () => {
  return (
    <div className="degree-plan">
      {degreePlan.map((year) => (
        <div key={year.id} className="year-section">
          <h2>{year.year}</h2>
          {year.semesters.map((semester) => (
            <div key={semester.id} className="semester-section">
              <h3>{semester.semesterName}</h3>
              {semester.courses.length > 0 ? (
                semester.courses.map((course) => (
                  <div key={course.code} className="course">
                    <h4>{course.name}</h4>
                    <p>{course.description}</p>
                  </div>
                ))
              ) : (
                <p>No courses added for this semester yet.</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DegreePlan;