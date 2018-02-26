/**
 * Normalizez value to be in the 0 - 100 range
 */
function normalizeValue({ value, min, max }) {
  if (value == undefined || null) {
    // 	console.error('value must be nonnull')
    return min;
  }

  // if is out of the range just clamp the value
  if (value === '100%') return 100;
  if (value <= min) return 0;
  if (value >= max) return 100;

  // normalize to 0 - 100
  return (value - min) / (max - min) * 100;
}

export default normalizeValue;
