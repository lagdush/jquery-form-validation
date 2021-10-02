import { inputValidation } from './src/inputValidation';
import { zipCodeFormat } from './src/zipCodeFormat';

$(document).ready(function () {
  const dropdownCity = $('#city-list');
  const dropdownStreet = $('#street-list');
  const zipCodeList = $('#zip-code');

  inputValidation();

  //API calls
  function createCityAndStreetLists() {
    $('#city').attr('value', '');
    $('#street').attr('value', '');
    const correctZipCode = zipCodeFormat($('#zip').val());
    if (!correctZipCode) return;
    const url = `http://kodpocztowy.intami.pl/api/${correctZipCode}`;
    $.getJSON(url, function (data) {
      $('#city').attr('value', data[0].miejscowosc);
      $('#street').attr('value', data[0].ulica);
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

  function getZipCodes() {
    zipCodeList.empty();
    $('#zip').attr('value', '');
    if (!$('#city').val()) return;
    const url = `http://kodpocztowy.intami.pl/city/${$('#city').val()}`;
    $.getJSON(url, function (data) {
      $('#zip').attr('value', data[0]);
      $.each(data, function (key, entry) {
        zipCodeList.append(
          $('<option></option>').attr('value', entry).text(entry)
        );
      });
    });
    zipCodeList.prop('selectedIndex', 0);
  }

  $('#zip').change(createCityAndStreetLists);
  $('#city').change(getZipCodes);
});
