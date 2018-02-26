function toLowerCaseFirst(s) {
  return s ? s.charAt(0).toLowerCase() + s.substring(1) : '';
}

export default toLowerCaseFirst;
