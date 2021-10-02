export const zipCodeFormat = (zipCode) => {
  if (zipCode.match(/[a-zA-Z]+/g)) {
    $('#zipCheck').show();
    return;
  }
  if (zipCode.length >= 6) {
    $('#zipCheck').show();
    return;
  }
  if (zipCode.length === 5) {
    return zipCode.substr(0, 2) + '-' + zipCode.substr(2);
  }
  return zipCode;
};
