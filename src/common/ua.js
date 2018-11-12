const ua = global.navigator ? global.navigator.userAgent || '' : '';
const IS_EDGE = ua.indexOf('Edge/') !== -1;
const IS_MS_BROWSER = IS_EDGE || ua.indexOf('Trident') !== -1;
const IS_IE = IS_MS_BROWSER && !IS_EDGE;

export { IS_EDGE, IS_IE, IS_MS_BROWSER };
