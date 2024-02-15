// global variables
let emptyFieldCount = 0;
let shortFieldCount = 0;

let inputs = document.querySelectorAll("input");

let submissionAlert = document.getElementById("alert");
submissionAlert.classList.add("d-none");

// used so only numbers are allowed in the input
function onlyAllowNum(inputID) {
  let inputElement = document.getElementById(inputID);

  inputElement.addEventListener("input", function () {
    // removes non-numeric char
    this.value = this.value.replace(/\D/g, "");
  });
}

// used so only letters are allowed in the input
function onlyAllowLetters(inputID) {
  let inputElement = document.getElementById(inputID);

  inputElement.addEventListener("input", function () {
    // removes non-alpha char
    this.value = this.value.replace(/[^a-zA-Z]/g, "");
  });
}

// formats credit card number
function addSpacesToCCNumber() {
  let inputElement = document.getElementById("cc-number");
  inputElement.addEventListener("input", function () {
    // adds a space after every 4 char
    this.value = this.value.replace(/(\d{4})(?=\d)/g, "$1 ");
  });
}

// adds all event listeners
document.addEventListener("DOMContentLoaded", function () {
  onlyAllowNum("cc-number");
  onlyAllowNum("cvc");
  onlyAllowNum("postcode");
  onlyAllowNum("amount");

  onlyAllowLetters("first-name");
  onlyAllowLetters("last-name");
  onlyAllowLetters("city");

  addSpacesToCCNumber();
});

// validates form
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  validateForm();
});

// validates form
function validateForm() {
  //reset counters
  emptyFieldCount = 0;
  shortFieldCount = 0;

  // loop over each input and checks if empty or short
  for (let input of inputs) {
    emptyFieldCount += isFieldEmpty(input);
    shortFieldCount += isShort(input);
  }

  // set and display alert
  if (emptyFieldCount != 0 && shortFieldCount != 0) displayAlert(3);
  else if (emptyFieldCount == 0 && shortFieldCount != 0) displayAlert(2);
  else if (emptyFieldCount != 0 && shortFieldCount == 0) displayAlert(1);
  else {
    displayAlert(0);
    return true;
  }

  return false;
}

// checks if empty
function isFieldEmpty(input) {
  if (input.value === "") return 1;
  else return 0;
}

// check if short
function isShort(input) {
  if (input.hasAttribute("maxlength") && input.value.length !== input.maxLength)
    return 1;
  else return 0;
}

// displays alert based in the given index
function displayAlert(index) {
  switch (index) {
    case 0: // valid form
      submissionAlert.classList.add("alert-success");
      submissionAlert.classList.remove("alert-danger");

      submissionAlert.textContent = "Your form was sent successfully!";
      break;

    case 1: // empty fields
      submissionAlert.classList.add("alert-danger");
      submissionAlert.classList.remove("alert-success");

      if (emptyFieldCount == 1)
        submissionAlert.textContent = "A field missing.";
      else submissionAlert.textContent = "Some fields are missing.";
      break;

    case 2: // invalid length fields
      submissionAlert.classList.add("alert-danger");
      submissionAlert.classList.remove("alert-success");

      if (shortFieldCount == 1)
        submissionAlert.textContent =
          "A field does not have the expected length.";
      else
        submissionAlert.textContent =
          "Some fields do not have the expected length.";
      break;

    case 3: // empty fields and invalid length
      submissionAlert.classList.add("alert-danger");
      submissionAlert.classList.remove("alert-success");

      submissionAlert.textContent =
        "Some fields are missing and some others do not have the expected length.";
      break;
  }

  submissionAlert.classList.remove("d-none");
}
