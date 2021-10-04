const phoneNumberCheck = (phone) => {
  phone.match(/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/)
    ? $('#phoneCheck').css('visibility', 'hidden')
    : $('#phoneCheck').css('visibility', 'visible');
};

const errorMessageHandler = (inputId, messageId) => {
  $(inputId).val() !== ''
    ? $(messageId).css('visibility', 'hidden')
    : $(messageId).css('visibility', 'visible');
};

const zipCodeCheck = (zipCode) => {
  zipCode.match(/^\d{2}[- ]{0,1}\d{3}$/gm)
    ? $('#zipCheck').css('visibility', 'hidden')
    : $('#zipCheck').css('visibility', 'visible');
};

export const inputValidation = () => {
  $('#firstname').change(() =>
    errorMessageHandler('#firstname', '#firstnameCheck')
  );

  $('#lastname').change(() =>
    errorMessageHandler('#lastname', '#lastnameCheck')
  );
  $('#email').change(() => errorMessageHandler('#email', '#emailCheck'));
  $('#phone').change(() => phoneNumberCheck($('#phone').val()));

  $('#zip').change(() => zipCodeCheck($('#zip').val()));

  $('#city').change(() => errorMessageHandler('#city', '#cityCheck'));

  $('#street').change(() => errorMessageHandler('#street', '#streetCheck'));
  $('#house-number').change(() =>
    errorMessageHandler('#house-number', '#houseCheck')
  );
};
