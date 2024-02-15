function limitNumericInputLength(inputID, maxLength) {
    var inputElement = document.getElementById(inputID);

    inputElement.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g,'');
        if (this.value.length > maxLength) this.value = this.value.slice(0, maxLength);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    limitNumericInputLength('cc-number', 16);
    limitNumericInputLength('cvc', 4);
    limitNumericInputLength('postcode', 5);
});