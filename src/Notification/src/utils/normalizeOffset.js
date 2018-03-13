const normalizeRegionOffset = offset => {
  if (typeof offset === 'number') {
    return {
      top: offset,
      left: offset,
      right: offset,
      bottom: offset
    };
  }

  return offset;
};

export default normalizeRegionOffset;
