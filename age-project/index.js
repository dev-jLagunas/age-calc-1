//Input Fields
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

//Input Labels
const dayLabel = document.querySelector('label[for="day"]');
const monthLabel = document.querySelector('label[for="month"]');
const yearLabel = document.querySelector('label[for="year"]');

//Date Spans
const yearsSpan = document.querySelector(".text-wrapper h3:nth-child(1) span");
const monthsSpan = document.querySelector(".text-wrapper h3:nth-child(2) span");
const daysSpan = document.querySelector(".text-wrapper h3:nth-child(3) span");

//button
const calculateButton = document.querySelector(".btn");

//Event Listener
calculateButton.addEventListener("click", function () {
  if (validateInputs()) {
    calculateAge();
  }
});

//Functions

function validateInputs() {
  // Remove old error messages
  let oldMessages = document.querySelectorAll(".error-message");
  oldMessages.forEach(function (message) {
    message.remove();
  });

  // Reset styles
  dayInput.style.borderColor = "";
  monthInput.style.borderColor = "";
  yearInput.style.borderColor = "";
  dayLabel.style.color = "";
  monthLabel.style.color = "";
  yearLabel.style.color = "";

  // Check if inputs are empty
  if (!dayInput.value || !monthInput.value || !yearInput.value) {
    if (!dayInput.value) {
      dayInput.style.borderColor = "red";
      dayLabel.style.color = "red";
      displayErrorMessage(dayInput, "Field Required");
    }
    if (!monthInput.value) {
      monthInput.style.borderColor = "red";
      monthLabel.style.color = "red";
      displayErrorMessage(monthInput, "Field Required");
    }
    if (!yearInput.value) {
      yearInput.style.borderColor = "red";
      yearLabel.style.color = "red";
      displayErrorMessage(yearInput, "Field Required");
    }
    return false;
  }

  // Check if date is valid
  let day = parseInt(dayInput.value);
  let month = parseInt(monthInput.value);
  let year = parseInt(yearInput.value);
  let inputDate = new Date(year, month - 1, day);
  if (
    inputDate.getDate() !== day ||
    inputDate.getMonth() + 1 !== month ||
    inputDate.getFullYear() !== year
  ) {
    dayInput.style.borderColor = "red";
    monthInput.style.borderColor = "red";
    yearInput.style.borderColor = "red";
    dayLabel.style.color = "red";
    monthLabel.style.color = "red";
    yearLabel.style.color = "red";
    displayErrorMessage(dayInput, "Invalid Date");
    return false;
  }

  // Check if date is in the future
  let currentDate = new Date();
  if (inputDate > currentDate) {
    dayInput.style.borderColor = "red";
    monthInput.style.borderColor = "red";
    yearInput.style.borderColor = "red";
    dayLabel.style.color = "red";
    monthLabel.style.color = "red";
    yearLabel.style.color = "red";
    displayErrorMessage(dayInput, "Must be past date");
    return false;
  }

  return true;
}

function displayErrorMessage(input, message) {
  let errorMessage = document.createElement("p");
  input.parentNode.insertBefore(errorMessage, input.nextSibling);
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
  errorMessage.className = "error-message";
  errorMessage.style.fontSize = "0.6rem";
  errorMessage.style.marginTop = "0.2rem";
  input.parentNode.insertBefore(errorMessage, input.nextSibling);
}

function calculateAge() {
  let day = parseInt(dayInput.value);
  let month = parseInt(monthInput.value);
  let year = parseInt(yearInput.value);
  let birthdate = new Date(year, month - 1, day);
  let currentDate = new Date();

  // Calculate the difference
  let years = currentDate.getFullYear() - birthdate.getFullYear();
  let months = currentDate.getMonth() - birthdate.getMonth();
  let days = currentDate.getDate() - birthdate.getDate();

  // If the day is negative, decrease months by one and add the number of days in the previous month
  if (days < 0) {
    months--;
    let previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days += previousMonth.getDate();
  }

  // If the month is negative or it's the birth month but the current day is before the birth day, decrease years by one
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months = (months + 12) % 12;
  }

  // Display the result
  yearsSpan.textContent = years;
  monthsSpan.textContent = months;
  daysSpan.textContent = days;
}
