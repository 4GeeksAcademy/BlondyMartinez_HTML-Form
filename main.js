function onlyAllowNum(inputID) {
  let inputElement = document.getElementById(inputID);

  inputElement.addEventListener("input", function () {
    // removes non-numeric char
    this.value = this.value.replace(/\D/g, "");
  });
}

function onlyAllowLetters(inputID) {
  let inputElement = document.getElementById(inputID);

  inputElement.addEventListener("input", function () {
    // removes non-alpha char
    this.value = this.value.replace(/[^a-zA-Z]/g, "");
  });
}

function addSpacesToCCNumber() {
  let inputElement = document.getElementById("cc-number");
  inputElement.addEventListener("input", function () {
    // adds a space after every 4 char
    this.value = this.value.replace(/(\d{4})(?=\d)/g, "$1 ");
  });
}

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

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  validateForm();
});

// global variables
let emptyFieldCount = 0;
let shortFieldCount = 0;

let inputs = document.querySelectorAll("input");

let submissionAlert = document.getElementById("alert");
submissionAlert.classList.add("d-none");

function validateForm() {
  emptyFieldCount = 0;
  shortFieldCount = 0;

  for (let input of inputs) {
    emptyFieldCount += isFieldEmpty(input);
    shortFieldCount += isShort(input);
  }

  if (emptyFieldCount != 0 && shortFieldCount != 0) displayAlert(3);
  else if (emptyFieldCount == 0 && shortFieldCount != 0) displayAlert(2);
  else if (emptyFieldCount != 0 && shortFieldCount == 0) displayAlert(1);
  else {
    displayAlert(0);
    return true;
  }

  return false;
}

function isFieldEmpty(input) {
  if (input.value === "") return 1;
  else return 0;
}

function isShort(input) {
  if (input.hasAttribute("maxlength") && input.value.length !== input.maxLength)
    return 1;
  else return 0;
}

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

  console.log(index);
  submissionAlert.classList.remove("d-none");
}
