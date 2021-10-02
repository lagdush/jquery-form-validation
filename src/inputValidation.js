const phoneNumberCheck = (phone) => {
  phone.match(/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/)
    ? $('#phoneCheck').css('display', 'none')
    : $('#phoneCheck').css('display', 'block');
};

const errorMessageHandler = (inputId, messageId) => {
  $(inputId).val() !== ''
    ? $(messageId).css('display', 'none')
    : $(messageId).css('display', 'block');
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

  $('#zip').change(() => errorMessageHandler('#zip', '#zipCheck'));

  $('#city').change(() => errorMessageHandler('#city', '#cityCheck'));

  $('#street').change(() => errorMessageHandler('#street', '#streetCheck'));
  $('#house-number').change(() =>
    errorMessageHandler('#house-number', '#houseCheck')
  );
};
