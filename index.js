import $ from 'jquery';
import { inputValidation } from './src/inputValidation';
import { zipCodeFormat } from './src/zipCodeFormat';

$(function () {
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

  $('#zip').on('change', createCityAndStreetLists);
});
