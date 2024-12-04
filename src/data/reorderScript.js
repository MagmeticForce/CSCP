const fs = require('fs'); // Import the file system module

// Step 1: Read the JSON file
const courses = JSON.parse(fs.readFileSync('courses.json', 'utf8'));

// Step 2: Sort the courses array by the 'code' field
courses.sort((a, b) => {
  if (a.code < b.code) return -1; // Move 'a' before 'b'
  if (a.code > b.code) return 1;  // Move 'b' before 'a'
  return 0; // Keep original order if equal
});

// Step 3: Write the sorted array back to the file
fs.writeFileSync('courses_sorted.json', JSON.stringify(courses, null, 2), 'utf8');

// Output a success message
console.log('Courses have been sorted by code!');