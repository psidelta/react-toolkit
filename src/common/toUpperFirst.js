module.exports = function(str) {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.substring(1);
};
