const buildComponentStyle = require('./buildComponentStyle');
const buildIndexCss = require('./buildIndexCss');
const getComponentNames = require('./getComponentNames');

const MODULE_NAME = process.env.npm_config_module;
if (MODULE_NAME === undefined) {
  throw new Error('No module name provided');
}

if ('ALL' === MODULE_NAME) {
  const compNamesPromise = getComponentNames();

  compNamesPromise
    .then(compNames => {
      compNames.map(compName => {
        buildComponentStyle(compName);

        return compNames;
      });

      return compNames;
    })
    .then(buildIndexCss);
} else {
  buildComponentStyle(MODULE_NAME);
}
