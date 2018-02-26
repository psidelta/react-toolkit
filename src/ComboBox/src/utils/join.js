const notEmpty = x => !!x;

export default function() {
  return [].slice
    .call(arguments)
    .filter(notEmpty)
    .join(' ');
}
