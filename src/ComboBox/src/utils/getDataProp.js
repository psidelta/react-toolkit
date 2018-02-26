const getDataProp = (propName) => {
  if (propName == null) {
    return null
  }

  return (item) => {
    if (!item) {
      return null
    }
    return typeof propName === 'function' ?
        propName(item) : item[propName]
  }
}

export default getDataProp
