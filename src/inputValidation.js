import $ from 'jquery';

const checkCityZipCode = (arrWithData) => {
  const citiesMatchZipCodeArr = arrWithData.filter(
    (address) => address.miejscowosc === $('#city').val()
  );
  if (!citiesMatchZipCodeArr.length) {
    $('#cityCheck')
      .text('Podane miasto ma inny kod pocztowy')
      .css('visibility', 'visible');
  } else {
    $('#cityCheck')
      .text('Podane miasto ma inny kod pocztowy')
      .css('visibility', 'hidden');
  }
};
//
const phoneNumberCheck = (phone) => {
  phone.match(/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/)
    ? $('#phoneCheck').css('visibility', 'hidden')
    : $('#phoneCheck')
        .text('Wpisz poprawny numer telefonu')
        .css('visibility', 'visible');
};

const emailCheck = (email) => {
  email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ? $('#emailCheck').css('visibility', 'hidden')
    : $('#emailCheck')
        .text('Wpisz poprawny email')
        .css('visibility', 'visible');
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
  $('#firstname').on('change', () =>
    errorMessageHandler('#firstname', '#firstnameCheck')
  );
  $('#lastname').on('change', () =>
    errorMessageHandler('#lastname', '#lastnameCheck')
  );
  $('#email').on('change', () => {
    errorMessageHandler('#email', '#emailCheck');
    emailCheck($('#email').val());
  });
  $('#phone').on('change', () => phoneNumberCheck($('#phone').val()));

  $('#zip').on('change', () => zipCodeCheck($('#zip').val()));

  $('#city').on('change', () => {
    errorMessageHandler('#city', '#cityCheck');

    const rawDataFromStorage = localStorage.getItem('data');
    if (!rawDataFromStorage) {
      return;
    }
    checkCityZipCode(JSON.parse(rawDataFromStorage));
  });

  $('#street').on('change', () =>
    errorMessageHandler('#street', '#streetCheck')
  );
  $('#house-number').on('change', () =>
    errorMessageHandler('#house-number', '#houseCheck')
  );
};
