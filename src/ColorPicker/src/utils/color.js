import tinycolor from 'tinycolor2';

function toColor(color) {
  return tinycolor(color);
}

function toPure(color) {
  const h = toColor(color).toHsl().h;
  return toColor({ h, s: 100, l: 50, a: 1 });
}

function fromRatio(color) {
  return tinycolor.fromRatio(color);
}

function toAlpha(color, alpha) {
  if (alpha > 1) {
    alpha = alpha / 100;
  }

  color = toColor(color).toRgb();
  color.a = alpha;

  return toColor(color);
}

function toRgb(color) {
  return toColor(color).toRgb();
}

function toHsv(color) {
  const c = toColor(color).toHsv();

  return {
    h: parseInt(c.h),
    v: c.v.toFixed(2) * 1,
    s: c.s.toFixed(2) * 1
  };
}

function toColorValue(color) {
  return typeof color == 'string' ? toHsv(color) : color;
}

export default {
  fromRatio,
  toAlpha,
  toColor,
  toHsv,
  toPure,
  toColorValue
};

export { fromRatio, toAlpha, toColor, toHsv, toPure, toColorValue, toRgb };
