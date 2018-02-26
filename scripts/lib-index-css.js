const getComponentNames = require('./getComponentNames');
const buildIndexCss = require('./buildIndexCss');

getComponentNames().then(buildIndexCss).catch(err => console.error(err));
