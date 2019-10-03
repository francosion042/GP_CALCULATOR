// Get the UI values
const numOfCourses = document.querySelector("#numOfCourse"),
  coursesForm = document.querySelector("#userInput"),
  coursesFormDiv = document.querySelector(".userInput"),
  resultDetailsDiv = document.querySelector(".resultDetails"),
  resultDetailsForm = document.querySelector("#grades"),
  computeGPBtn = document.querySelector("#computeGP"),
  spinner = document.querySelector(".loading"),
  calculatedGPA = document.querySelector("#calculatedGPA"),
  reloadBtn = document.querySelector("#reload");

// Take the number of courses that the User registered for
const coursesNum = parseInt(numOfCourses.value);

// EVENTS
//listen for a register form submit event
coursesForm.addEventListener("submit", enterResult);
// listen for click event on the compute gpa button
computeGPBtn.addEventListener("click", function() {
  // Hide the two div that are on the page
  coursesFormDiv.style.display = "none";
  resultDetailsDiv.style.display = "none";

  // Add a spinner that will display for 2 seconds
  spinner.style.display = "block";

  // Allow the spinner to run for 2 seconds
  setTimeout(calculateGPA, 2000);
});
// Reload the Calculator
reloadBtn.addEventListener("click", function() {
  window.location.reload();
});

// FUNCTIONS
// form to take the result of the User
function enterResult(e) {
  // Use FOR loop to create input element and attach it to the form
  for (let i = 1; i <= parseInt(numOfCourses.value); i++) {
    // create div element
    let inputDiv,
      inputField,
      selectUnitDiv,
      selectUnitField,
      selectGradeDiv,
      selectGradeField;
    inputDiv = document.createElement("div");
    // Add class to the div
    inputDiv.className = "form-group block";
    // Create input element that will be attached to the input div
    inputField = document.createElement("input");
    // Add class and other input attribute to the input field
    inputField.className = "form-control text-center mb-1 w-100 centered";
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Course Code");
    inputField.id = "course" + i;
    //append the inputfield to the parent element div
    inputDiv.appendChild(inputField); // the end of the first div input element

    // create div element
    selectUnitDiv = document.createElement("div");

    // Add class to the div
    selectUnitDiv.className = "form-group col-6";
    // create the select element that will be atttached to this form group
    selectUnitField = document.createElement("select");
    selectUnitField.className = "form-control text-center  mb-5 w-100 centered";
    selectUnitField.id = "unit" + i;
    // pass the list of the options into the select using the innerHTML
    selectUnitField.innerHTML = '<option value="0">Unit Load</option>';
    selectUnitField.innerHTML += '<option value="1">1 Unit</option>';
    selectUnitField.innerHTML += '<option value="2">2 Units</option>';
    selectUnitField.innerHTML += '<option value="3">3 Units</option>';
    selectUnitField.innerHTML += '<option value="4">4 Units</option>';
    selectUnitField.innerHTML += '<option value="5">5 Units</option>';
    selectUnitField.innerHTML += '<option value="6">6 Units</option>';
    selectUnitField.innerHTML += '<option value="7">7 Units</option>';
    selectUnitField.innerHTML += '<option value="8">8 Units</option>';
    selectUnitField.innerHTML += '<option value="9">9 Units</option>';
    selectUnitField.innerHTML += '<option value="10">10 Units</option>';
    selectUnitField.innerHTML += '<option value="11">11 Units</option>';
    selectUnitField.innerHTML += '<option value="12">12 Units</option>';
    selectUnitField.innerHTML += '<option value="13">13 Units</option>';
    selectUnitField.innerHTML += '<option value="14">14 Units</option>';
    selectUnitField.innerHTML += '<option value="15">15 Units</option>';
    selectUnitField.innerHTML += '<option value="16">16 Units</option>';
    selectUnitField.innerHTML += '<option value="17">17 Units</option>';
    selectUnitField.innerHTML += '<option value="18">18 Units</option>';
    selectUnitField.innerHTML += '<option value="19">19 Units</option>';
    selectUnitField.innerHTML += '<option value="20">20 Units</option>';
    selectUnitField.innerHTML += '<option value="21">21 Units</option>';
    selectUnitField.innerHTML += '<option value="22">22 Units</option>';
    selectUnitField.innerHTML += '<option value="23">23 Units</option>';
    selectUnitField.innerHTML += '<option value="24">24 Units</option>';
    // append the select to it div
    selectUnitDiv.appendChild(selectUnitField);

    // create div element
    selectGradeDiv = document.createElement("div");
    // Add class to the div
    selectGradeDiv.className = "form-group col-6";
    // create the select element that will be atttached to this form group
    selectGradeField = document.createElement("select");
    selectGradeField.className = "form-control text-center mb-5 w-100 centered";
    selectGradeField.id = "grade" + i;
    // pass the list of the options into the select using the innerHTML
    selectGradeField.innerHTML = '<option value="0">Grade</option>';
    selectGradeField.innerHTML += '<option value="5">A</option>';
    selectGradeField.innerHTML += '<option value="4">B</option>';
    selectGradeField.innerHTML += '<option value="3">C</option>';
    selectGradeField.innerHTML += '<option value="2">D</option>';
    selectGradeField.innerHTML += '<option value="1">E</option>';
    selectGradeField.innerHTML += '<option value="0">F</option>';
    // append the select to it div
    selectGradeDiv.appendChild(selectGradeField);
    //selectGradeDiv.append(document.createElement("hr"));

    // Then append each of the Div to the form tag

    resultDetailsForm.appendChild(inputDiv);
    resultDetailsForm.appendChild(selectUnitDiv);
    resultDetailsForm.appendChild(selectGradeDiv);

    // then show the form part of the page that is displaying the result
    resultDetailsDiv.style.display = "block";
  }
  e.preventDefault();
}

function calculateGPA() {
  // GPA = total(grade * unit) / unit
  // initialize the array that will be used to store the values
  let grades = [],
    units = [],
    gradeUnit = [];
  for (let i = 1; i <= parseInt(numOfCourses.value); i++) {
    grades.push(document.querySelector("#grade" + i).value);
    units.push(parseInt(document.querySelector("#unit" + i).value));
    gradeUnit.push(
      document.querySelector("#grade" + i).value *
        document.querySelector("#unit" + i).value
    );
  }
  // sum the gradeUnit and unit
  const totalGradeUnit = gradeUnit.reduce((total, gradeU) => total + gradeU, 0);
  const totalUnits = units.reduce((total, unit) => total + unit, 0);
  const gpa = (totalGradeUnit / totalUnits).toFixed(2);
  displayGPA(gpa);
  console.log(gpa);
}

function displayGPA(gpa) {
  // Remove the Spinner
  spinner.style.display = "none";

  // Display the result div
  calculatedGPA.style.display = "block";

  // Display the calculated gpa with with it class of degree
  document.querySelector("#displayGPA").value = gpa;
  let classOfDegree;
  classOfDegree = remark(gpa);
  document.querySelector("#displayRemark").value = classOfDegree;

  // Add a button that will allow the user to calculate another GPA
}

// Set the Class of Degree
function remark(gpa) {
  if (gpa >= 4.5) {
    return "First Class";
  } else if (gpa >= 3.5 && gpa < 4.5) {
    return "Second Class Upper";
  } else if (gpa >= 2.5 && gpa < 3.5) {
    return "Second Class Lower";
  } else if (gpa >= 1.5 && gpa < 2.5) {
    return "Third Class";
  } else if (gpa >= 1.0 && gpa < 1.5) {
    return "Pass";
  } else {
    return "Fail";
  }
}
