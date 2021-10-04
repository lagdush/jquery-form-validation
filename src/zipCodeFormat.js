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
