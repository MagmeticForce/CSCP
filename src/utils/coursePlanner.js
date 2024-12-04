import courses from '../data/courses_sorted.json';

export const predefinedSemesters = [
  ["MTH 1554", "CSI 1420", "WRT 1060", "LANGUAGE_CULTURE_GEN_ED"],
  ["CSI 2300", "MTH 1555", "SCI_LAB_GEN_ED", "ARTS_GEN_ED"],
  ["APM 2663", "CSI 2310", "GLOBAL_PERSPECTIVE_GEN_ED", "LITERATURE_GEN_ED"],
  ["MTH 2775", "CSI 2470", "CSI 2999", "PHL 1310", "SOCIAL_SCIENCE_GEN_ED"],
  ["STA 2226", "CSI 3480", "CSI 3610", "CSI 3640"],
  ["CSI 3370", "CSI 3430", "CSI 4650", "PROFESSIONAL_ELECTIVE"],
  ["CSI 3450", "CSI 4350", "PROFESSIONAL_ELECTIVE", "PROFESSIONAL_TRACK"],
  ["CSI 4500", "CSI 4999", "PROFESSIONAL_ELECTIVE", "PROFESSIONAL_TRACK"],
];

// src/utils/coursePlanner.js

export const genEdCourses = [
  {
    code: "LANGUAGE_CULTURE_GEN_ED",
    name: "Language and Culture General Education",
    category: "General Education",
    hours: 4,
    link: "https://catalog.oakland.edu/preview_program.php?catoid=64&poid=12614#languageandculture" // Replace with actual link
  },
  {
    code: "SCI_LAB_GEN_ED",
    name: "Approved Science Elective with Lab",
    category: "General Education",
    hours: 4,
    link: "https://catalog.oakland.edu/preview_program.php?catoid=64&poid=12614#languageandculture" // Replace with actual link
  },
  {
    code: "ARTS_GEN_ED",
    name: "Arts General Education Course",
    category: "General Education",
    hours: 4,
    link: "https://catalog.oakland.edu/preview_program.php?catoid=64&poid=12614#languageandculture" // Replace with actual link
  },
  {
    code: "GLOBAL_PERSPECTIVE_GEN_ED",
    name: "Global Perspective General Education Course",
    category: "General Education",
    hours: 4,
    link: "https://catalog.oakland.edu/preview_program.php?catoid=64&poid=12614#languageandculture" // Replace with actual link
  },
  {
    code: "LITERATURE_GEN_ED",
    name: "Literature General Education Course",
    category: "General Education",
    hours: 4,
    link: "https://catalog.oakland.edu/preview_program.php?catoid=64&poid=12614#languageandculture" // Replace with actual link
  },
  {
    code: "SOCIAL_SCIENCE_GEN_ED",
    name: "Social Science General Education Course",
    category: "General Education",
    hours: 4,
    link: "https://catalog.oakland.edu/preview_program.php?catoid=64&poid=12614#languageandculture" // Replace with actual link
  }
];


export function resolveElectivesAndTracks(predefinedSemesters, courses) {
  const resolvedSemesters = predefinedSemesters.map((semester) => {
    return semester.map((courseCode) => {
      if (courseCode === "PROFESSIONAL_ELECTIVE") {
        // Find the first elective not already placed
        const elective = courses.find((c) => c.category === "PROFESSIONAL_ELECTIVE" && !c.placed);
        if (elective) elective.placed = true; // Mark as placed
        return elective || { code: "PROFESSIONAL_ELECTIVE", name: "Elective Placeholder", hours: 3 };
      }
      if (courseCode === "PROFESSIONAL_TRACK") {
        // Find the first track course not already placed
        const track = courses.find((c) => c.category === "PROFESSIONAL_TRACK" && !c.placed);
        if (track) track.placed = true; // Mark as placed
        return track || { code: "PROFESSIONAL_TRACK", name: "Track Placeholder", hours: 3 };
      }
      // Return the original course code for non-placeholders
      return courseCode;
    });
  });
  return resolvedSemesters;
}


courses.forEach((course) => {
  if (!predefinedSemesters.flat().includes(course.code)) {
    console.warn(`Course ${course.code} is missing from predefinedSemesters.`);
  }
});
console.log("Loaded courses:", courses);

export function gatherAllPrerequisites(courseCode, courses) {
  const prerequisites = new Set();

  function findPrerequisites(code) {
      const course = courses.find((c) => c.code === code);
      console.log(`Checking prerequisites for: ${code}`, course);
      if (!course || !course.prerequisites) return;

      course.prerequisites.forEach((prerequisite) => {
          console.log(`Adding prerequisite: ${prerequisite}`);
          if (!prerequisites.has(prerequisite)) {
              prerequisites.add(prerequisite);
              findPrerequisites(prerequisite); // Recursively find prerequisites
          }
      });
  }

  findPrerequisites(courseCode);
  console.log(`Prerequisites for ${courseCode}:`, Array.from(prerequisites));
  return Array.from(prerequisites);
}


export function organizeBySemesters(courses, predefinedSemesters, maxCreditHoursPerSemester = 16) {
  // Resolve electives and tracks first
  const resolvedSemesters = resolveElectivesAndTracks(predefinedSemesters, courses);

  const semesters = Array.from({ length: 8 }, () => []);
  const placedCourses = new Set();

  for (let semesterIndex = 0; semesterIndex < resolvedSemesters.length; semesterIndex++) {
    let semesterCredits = 0;

    for (let courseCodeOrObject of resolvedSemesters[semesterIndex]) {
      // Handle both strings and course objects
      const course = typeof courseCodeOrObject === "string"
        ? courses.find((c) => c.code === courseCodeOrObject)
        : courseCodeOrObject;

      if (!course) {
        console.warn(`Course ${courseCodeOrObject} not found.`);
        continue;
      }

      if (!placedCourses.has(course.code) && semesterCredits + (course.hours || 4) <= maxCreditHoursPerSemester) {
        semesters[semesterIndex].push(course);
        placedCourses.add(course.code);
        semesterCredits += course.hours || 4;
      }
    }
  }
  return semesters;
}






/*export function organizeBySemesters(courses, maxCreditHoursPerSemester = 16) {
  // Initialize semesters
  const semesters = Array.from({ length: 8 }, () => []);
  let currentSemesterIndex = 0;
  let currentSemesterCredits = 0;

  for (let course of courses) {
    const courseCredits = course.hours || 4; // Default to 4 credit hours if not specified

    // Move to the next semester if adding this course exceeds the max credits
    if (currentSemesterCredits + courseCredits > maxCreditHoursPerSemester) {
      currentSemesterIndex++;
      currentSemesterCredits = 0;
    }

    // If there are more than 8 semesters, warn the user
    if (currentSemesterIndex >= semesters.length) {
      console.warn("Exceeded planned semesters. Adjust logic to allow more semesters.");
      break;
    }

    // Add course to the current semester
    semesters[currentSemesterIndex].push(course);
    currentSemesterCredits += courseCredits;
  }

  return semesters;
}
  const courseMap = {}; // Map for quick lookup of courses by code

  // Step 1: Build a course map for easy access
  courses.forEach(course => {
    courseMap[course.code] = { ...course, placed: false }; // Add 'placed' to track placement
  });

  // Step 2: Function to check if prerequisites are satisfied
  const prerequisitesSatisfied = (prerequisites, semesterIndex) => {
    for (const prerequisite of prerequisites) {
      // Check if the prerequisite course is already placed in an earlier semester
      let prerequisitePlaced = false;
      for (let i = 0; i < semesterIndex; i++) {
        if (semesters[i].some(course => course.code === prerequisite)) {
          prerequisitePlaced = true;
          break;
        }
      }
      if (!prerequisitePlaced) return false;
    }
    return true;
  };

  // Step 3: Place courses into semesters
  while (Object.values(courseMap).some(course => !course.placed)) {
    const currentSemester = []; // Courses for the current semester
    let currentHours = 0; // Track credit hours in the semester

    for (const course of Object.values(courseMap)) {
      if (!course.placed) {
        if (
          (!course.prerequisites.length || prerequisitesSatisfied(course.prerequisites, semesters.length)) &&
          currentHours + course.hours <= maxCreditHours // Check credit hour limit
        ) {
          currentSemester.push(course);
          currentHours += course.hours;
          course.placed = true;
        }
      }
    }

    if (currentSemester.length === 0) {
      console.error('Circular dependency detected or unsatisfiable prerequisites!');
      break;
    }

    semesters.push(currentSemester); // Add current semester to the list
  }

  return semesters;
};*/
