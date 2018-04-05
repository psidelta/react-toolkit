const buildComponentLib = require('./buildComponentLib')
const getComponentNames = require('./getComponentNames')

const MODULE_NAME = process.env.npm_config_module
if ('ALL' === MODULE_NAME) {
  getComponentNames()
    .then(componentNames => componentNames.map(buildComponentLib))
    .catch(err => console.log(err))
} else {
  buildComponentLib(MODULE_NAME)
}
