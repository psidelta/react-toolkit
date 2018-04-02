import { toHsv } from './color';

const toColorValue = value => {
  if (typeof value == 'string') {
    return toHsv(value);
  }

  if (!value) {
    return {};
  }

  return {
    h: value.h,
    s: value.s,
    v: value.v,
    a: value.a
  };
};

export default toColorValue;
