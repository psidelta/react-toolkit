function pxToFloat(str) {
  if (typeof str !== 'string') {
    return null;
  }
  return parseFloat(str.replace('px', ''));
}

export default pxToFloat;
