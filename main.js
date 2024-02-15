function onlyAllowNum(inputID) {
    let inputElement = document.getElementById(inputID);

    inputElement.addEventListener('input', function() {
        // removes non-numeric char
        this.value = this.value.replace(/\D/g,'');
    });
}

function onlyAllowLetters(inputID) {
  let inputElement = document.getElementById(inputID);

  inputElement.addEventListener('input', function() {
      // removes non-numeric char
      this.value = this.value.replace(/[^a-zA-Z]/g,'');
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
    
    onlyAllowLetters('first-name');
    onlyAllowLetters('last-name');
    onlyAllowLetters('city');

    addSpacesToCCNumber();
});