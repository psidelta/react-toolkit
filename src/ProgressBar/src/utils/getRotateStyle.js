function getRotateStyle(rotateLabel) {
  let rotateValue

  if (rotateLabel === true) {
    rotateValue = '90deg'
  } else 	if (rotateLabel === false ) {
    rotateValue = false
  } else {
    rotateValue = `${rotateLabel}deg`
  }

  const rotateStyle = rotateValue?
                { transform: `rotate(${rotateValue})` }
                :
                {}

  return rotateStyle;
}

export default getRotateStyle
