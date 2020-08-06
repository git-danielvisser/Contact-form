var nameValidator = {
  regex: /^[a-zA-Z]{2,25}$/,
  errorMessage: 'This is not a valid name, it can only contain the letters (a-z A-Z) and must have 3-25 characters.'
};

var emailValidator = {
  // Credit @ Charles L. for helpfull information: https://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-an-email-address
  regex: /^(?!\.)((?!\.{2,}|\.@)[a-zA-Z0-9.!#$%&'*+\-/=?^_`{|}~]){2,63}@[a-zA-Z0-9-]{2,63}\.[a-zA-Z]{2,63}$/, // https://regexr.com/596fm
  errorMessage: 'This is not a valid email adress.'
};

var phoneNumberValidator = {
  regex: /^\+?((?!-{2,})[0-9\-])+$/, // https://regexr.com/5977p
  errorMessage: 'This is not a valid phone number, only numbers and (+-) are allowed.'
};

var zipCodeValidator = {
  regex: /^[0-9]{4,5}\040?([a-zA-Z]{2})?$/,  // https://regexr.com/5979f
  errorMessage: 'This is not a valid zipcode'
};

var streetNumberValidator = {
  regex: /^[0-9]{1,4}[a-zA-Z]?$/, // https://regexr.com/597a1
  errorMessage: 'This is not a valid street number.'
};

var messageValidator = {
  regex: /^[^]{10,300}$/,
  errorMessage: 'This is not a valid message, it must have 10-300 characters.'
};

function createFieldWithValidation(sel, validator) {
  // Select elements
  var fieldEle = document.querySelector(sel);
  var inputEle = fieldEle.querySelector('.js-input');

  // Create and add error message element
  var errorMessageEle = document.createElement('span');
  errorMessageEle.classList.add('field__error-message');
  fieldEle.prepend(errorMessageEle);

  function isValueValid() {
    var value = inputEle.value.trim();
    // Return true if field is not required and no value is set.
    if (!inputEle.required && value.length === 0) {
      return true;
    }
    // Return true if the regex matches, else return false.
    return validator.regex.test(value);
  }

  function validate() {
    var valid = isValueValid();
    if (valid) {
      errorMessageEle.innerText = '';
    } else {
      errorMessageEle.innerText = validator.errorMessage;
    }
    return valid;
  }

  // Add Event listener
  inputEle.addEventListener('change', validate);

  // Interface object
  var field = {
    element: fieldEle,
    validate: validate,
    isValueValid: isValueValid
  };

  // Return interface object
  return field;
}

window.addEventListener('load', function() {

  var fields = [
    createFieldWithValidation('#first-name-field', nameValidator),
    createFieldWithValidation('#last-name-field', nameValidator),
    createFieldWithValidation('#email-field', emailValidator),
    createFieldWithValidation('#phone-number-field', phoneNumberValidator),
    createFieldWithValidation('#place-name-field', nameValidator),
    createFieldWithValidation('#zipcode-field', zipCodeValidator),
    createFieldWithValidation('#street-name-field', nameValidator),
    createFieldWithValidation('#street-number-field', streetNumberValidator),
    createFieldWithValidation('#message-field', messageValidator)
  ];

  var formSubmit = document.querySelector('#form-submit');
  formSubmit.addEventListener('click', function(e) {

    // Validate each field.
    var passed = true;
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].validate()) {
        // One field value is not valid, set passed to false.
        passed = false;
      }
    }

    // Prevent the form from submiting if one or more of the field did not pass.
    if (!passed) {
      e.preventDefault();
    } else {
      alert('Form submit!');
    }

  });
});
