function getSeparatorIndexes(children) {
  return children.reduce((acc, child, index) => {
    if (child === '-' || (child.props && child.props.isSeparator)) {
      acc.push(index);
    }
    return acc;
  }, []);
}

export default getSeparatorIndexes;
