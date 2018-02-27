export default function getDecimalDelimiter(locale) {
  return (1.1).toLocaleString(locale).replace(/1/g, '') || '.'; // we need || "." since SAFARI does not work correctly
}
