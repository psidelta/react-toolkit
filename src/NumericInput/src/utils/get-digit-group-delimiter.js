export default function getDigitGroupDelimiter(locale) {
  const number = 1000;
  return number.toLocaleString(locale).replace(/[01]/g, '') || ','; // we need || "," since SAFARI does not work correctly
}
