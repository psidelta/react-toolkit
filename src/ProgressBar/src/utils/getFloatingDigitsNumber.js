function getFloatingDigitsNumber(number) {
  const parts = number.toString().split('.')

  if (parts.length === 1) {
    return 0
  } else {
    return parts[1].length
  }
}

export default getFloatingDigitsNumber
