export default function splitFileInNameAndType(name) {
  name = name || '';
  const indexOfDot = name.lastIndexOf('.');
  const fileName = name.substring(0, indexOfDot);
  const fileExtention = name.substring(indexOfDot);
  return { fileName, fileExtention };
}
