const notEmpty = x => !!x && x !== true;
export default function(...args) {
  if (args.length == 1 && Array.isArray(args[0])) {
    args = args[0];
  }
  return [...args].filter(notEmpty).join(' ');
}
