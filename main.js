function onlyAllowNum(inputID) {
    let inputElement = document.getElementById(inputID);

    inputElement.addEventListener('input', function() {
        // removes non-numeric char
        this.value = this.value.replace(/\D/g,'');
    });
}

function addSpacesToCCNumber(){
    let inputElement = document.getElementById('cc-number');
    inputElement.addEventListener('input', function() {
        // adds a space after every 4 char
        this.value = this.value.replace(/(\d{4})(?=\d)/g, '$1 ');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    onlyAllowNum('cc-number');
    onlyAllowNum('cvc');
    onlyAllowNum('postcode');
    onlyAllowNum('amount');
    addSpacesToCCNumber();
});

// validation function 
(function () {
    'use strict'
  
    // fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation');
    let alert = document.getElementById('alert');
  
    // loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          let inputs = form.querySelectorAll('input');
          let tooShort = false;
          let requiredFieldsMissing = false;

          // custom validation
          inputs.forEach(function(input) {
            // check if its length is greater than its maxlength attribute
            if (input.value.length < input.maxLength) {
              tooShort = true;
              input.classList.add('is-invalid');
            } else {
              input.classList.remove('is-invalid');
            }

            // check if it is required and empty
            if (input.hasAttribute('required') && input.value.trim() === '') {
              requiredFieldsMissing = true;
              input.classList.add('is-invalid'); 
            } else {
              input.classList.remove('is-invalid');
            }
          });

          // if required fields are missing show alert, else hide it
          if (requiredFieldsMissing) {
            alert.classList.remove('d-none');

            event.preventDefault();
            event.stopPropagation();
          } else alert.classList.add('d-none');

          // if its too short or invalid
          if (tooShort || !form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()