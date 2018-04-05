const getComponentNames = require('./getComponentNames');
const buildThemes = require('./buildThemes');

const MODULE_NAME = process.env.npm_config_module;
if (MODULE_NAME === undefined) {
  throw new Error('No module name provided');
}

const exludeComponents = {
  ArrowScroller: 1,
  Panel: 1,
  MessageWindow: 1,
  Window: 1,
  NumericInput: 1,
  Menu: 1,
  SplitContainer: 1,
  Button: 1,
  SplitButton: 1,
  DropdownButton: 1,
  Toolbar: 1,
  app: 1
};

if (MODULE_NAME in exludeComponents) {
  return;
}

if ('ALL' === MODULE_NAME) {
  getComponentNames()
    .filter(cmpName => !exludeComponents[cmpName])
    .then(compNames =>
      compNames.map(compName => {
        buildThemes(compName);
      })
    );
} else {
  buildThemes(MODULE_NAME);
}
