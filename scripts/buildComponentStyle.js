const getComponentNames = require('./getComponentNames')
const themeBuilder = require('@zippytech/theme-builder')
const path = require('path')

function buildComponentStyle(component) {
  const inputPath = path.resolve(
    __dirname,
    '..',
    'src',
    component,
    'style'
  )

  const outputPath = path.resolve(
    __dirname,
    '..',
    'lib',
    component
  )

  themeBuilder(inputPath, outputPath)
}

module.exports = buildComponentStyle
