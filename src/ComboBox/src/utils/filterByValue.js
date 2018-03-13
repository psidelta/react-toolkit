import isSelected from './isSelected';

function filterByValue({ data, getIdProperty, value }) {
  return data.filter(item => {
    const id = getIdProperty(item);
    return !isSelected({ id, value });
  });
}

export default filterByValue;
