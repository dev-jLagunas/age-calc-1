const {
  validateInputs,
  displayErrorMessage,
  calculateAge,
} = require("../index");

// Mock the DOM elements
document.body.innerHTML = `
  <article class="container">
    <div class="input-wrapper">
      <div class="input-field">
        <label for="day">DAY</label>
        <input id="day" />
      </div>
      <div class="input-field">
        <label for="month">MONTH</label>
        <input id="month" />
      </div>
      <div class="input-field">
        <label for="year">YEAR</label>
        <input id="year" />
      </div>
    </div>
    <div class="line-wrapper">
      <hr class="line" />
      <button class="icon-wrapper btn">
        <img
          src="/age-project/icon-arrow.svg"
          alt="arrow icon"
          class="icon"
        />
      </button>
    </div>
    <div class="text-wrapper">
      <h3><span>--</span> years</h3>
      <h3><span>--</span> months</h3>
      <h3><span>--</span> days</h3>
    </div>
  </article>
`;

// Write your tests
describe("validateInputs function", () => {
  // ... (write tests for validateInputs function)
});

describe("displayErrorMessage function", () => {
  let input;
  let errorMessage;

  beforeEach(() => {
    // Set up a clean DOM environment before each test
    document.body.innerHTML = `
        <div class="input-wrapper">
          <input id="test-input" />
        </div>
      `;

    // Get references to the input and create a clean error message element
    input = document.getElementById("test-input");
    errorMessage = document.createElement("p");
  });

  test("it should create and insert an error message after the input", () => {
    // Trigger the function
    displayErrorMessage(input, "Test Error Message");

    // Check if the error message is created and inserted correctly
    const errorMessages = document.querySelectorAll(".error-message");
    expect(errorMessages.length).toBe(1);

    // Check the content and styling of the error message
    const createdErrorMessage = errorMessages[0];
    expect(createdErrorMessage.textContent).toBe("Test Error Message");
    expect(createdErrorMessage.style.color).toBe("red");
    expect(createdErrorMessage.style.fontSize).toBe("0.6rem");
    expect(createdErrorMessage.style.marginTop).toBe("0.2rem");
  });

  test("it should replace an existing error message if called again", () => {
    // Trigger the function twice
    displayErrorMessage(input, "First Error");
    displayErrorMessage(input, "Second Error");

    // Check if only one error message exists
    const errorMessages = document.querySelectorAll(".error-message");
    expect(errorMessages.length).toBe(1);

    // Check the content of the replaced error message
    const createdErrorMessage = errorMessages[0];
    expect(createdErrorMessage.textContent).toBe("Second Error");
  });

  test("it should insert the error message after the input even if there are other elements", () => {
    // Add another element after the input
    const siblingElement = document.createElement("div");
    input.parentNode.appendChild(siblingElement);

    // Trigger the function
    displayErrorMessage(input, "Test Error Message");

    // Check if the error message is inserted after the input
    const errorMessages = document.querySelectorAll(".error-message");
    expect(errorMessages.length).toBe(1);
    const createdErrorMessage = errorMessages[0];
    expect(createdErrorMessage.previousElementSibling).toBe(input);
  });
});

describe("calculateAge function", () => {
  // ... (write tests for calculateAge function)
});
