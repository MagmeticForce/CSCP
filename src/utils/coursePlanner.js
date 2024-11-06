export function organizeCoursesBySemester(courses) {
    const semesters = [];
    const completedCourses = new Set();
  
    courses.forEach(course => {
      const { prerequisites, code } = course;
      const prereqsMet = prerequisites.every(prereq =>
        prereq.split(' ')[0] === '&&&' || completedCourses.has(prereq.split(' ')[0])
      );
  
      if (prereqsMet) {
        const semester = semesters.length + 1;
        if (!semesters[semester]) semesters[semester] = { semesterName: `Semester ${semester}`, courses: [] };
        semesters[semester].courses.push(course);
        completedCourses.add(code);
      }
    });
  
    return semesters.filter(Boolean); // Remove any undefined slots
  }