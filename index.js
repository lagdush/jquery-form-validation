// import { inputValidation } from './src/inputValidation';
// import { zipCodeFormat } from './src/zipCodeFormat';
//
// check city zip code
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
  $('#firstname').change(() =>
    errorMessageHandler('#firstname', '#firstnameCheck')
  );
  $('#lastname').change(() =>
    errorMessageHandler('#lastname', '#lastnameCheck')
  );
  $('#email').change(() => {
    errorMessageHandler('#email', '#emailCheck');
    emailCheck($('#email').val());
  });
  $('#phone').change(() => phoneNumberCheck($('#phone').val()));

  $('#zip').change(() => zipCodeCheck($('#zip').val()));

  $('#city').change(() => {
    errorMessageHandler('#city', '#cityCheck');

    const rawDataFromStorage = localStorage.getItem('data');
    if (!rawDataFromStorage) {
      return;
    }
    checkCityZipCode(JSON.parse(rawDataFromStorage));
  });

  $('#street').change(() => errorMessageHandler('#street', '#streetCheck'));
  $('#house-number').change(() =>
    errorMessageHandler('#house-number', '#houseCheck')
  );
};

export const zipCodeFormat = (zipCode) => {
  if (!zipCode.match(/^\d{2}[- ]{0,1}\d{3}$/gm)) {
    $('#zipCheck').show();
    return false;
  }
  if (zipCode.match(/^\d{2}[- ]{0,1}\d{3}$/gm) && zipCode.length === 5) {
    return zipCode.substr(0, 2) + '-' + zipCode.substr(2);
  }
  return zipCode;
};

//

$(document).ready(function () {
  const dropdownCity = $('#city-list');
  const dropdownStreet = $('#street-list');

  //API calls
  function createCityAndStreetLists() {
    dropdownCity.empty();
    dropdownStreet.empty();
    dropdownCity.prop('selectedIndex', 0);
    dropdownStreet.prop('selectedIndex', 0);

    $('#city').attr('value', '');
    $('#street').attr('value', '');
    const correctZipCode = zipCodeFormat($('#zip').val());
    if (!correctZipCode) return;
    const url = `http://kodpocztowy.intami.pl/api/${correctZipCode}`;
    $.getJSON(url, function (data) {
      localStorage.setItem('data', JSON.stringify(data));
      const citiesMatchZipCodeArr = data.filter(
        (address) => address.miejscowosc === $('#city').val()
      );

      if ($('#city').val() !== '' && !citiesMatchZipCodeArr.length) {
        $('#cityCheck')
          .text('Podane miasto ma inny kod pocztowy')
          .css('visibility', 'visible');
      } else {
        $('#cityCheck')
          .text('Podane miasto ma inny kod pocztowy')
          .css('visibility', 'hidden');
      }
      $('#city').attr('value', data[0].miejscowosc);
      $('#street').attr('value', data[0].ulica);
      // if zip code is equal to Felg Software address
      if (correctZipCode === '31-016') {
        $('#house-number').attr('value', '25');
        $('#flat-number').attr('value', '9');
        $('#felg-software').css('visibility', 'visible');
      } else {
        $('#house-number').attr('value', '');
        $('#flat-number').attr('value', '');
        $('#felg-software').css('visibility', 'hidden');
      }
      $.each(data, function (key, entry) {
        dropdownCity.append(
          $('<option></option>')
            .attr('value', entry.miejscowosc)
            .text(entry.name)
        );
        dropdownStreet.append(
          $('<option></option>').attr('value', entry.ulica).text(entry.name)
        );
      });
    });
  }

  inputValidation();

  $('#zip').change(createCityAndStreetLists);
});
