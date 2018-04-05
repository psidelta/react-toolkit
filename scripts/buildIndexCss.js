const f = require('fs');
const fs = require('fs-extra');
const path = require('path');

const buildStyle = require('@zippytech/theme-builder/buildStyle');

module.exports = compNames => {
  const indexCSSSource = compNames.reduce((acc, cmpName) => {
    const filePath = `./${cmpName}/style/index.scss`;
    const fullPath = path.join(__dirname, '../src', filePath);
    if (!fs.pathExistsSync(fullPath)) {
      console.log(fullPath, ' does not exist');
      return acc;
    }
    return `${acc}
  @import '${filePath}';
`;
  }, '');

  const tmpFileName = path.join(
    __dirname,
    '../src',
    'index-' + Date.now() + '.scss'
  );

  f.writeFileSync(tmpFileName, indexCSSSource);

  return buildStyle(
    tmpFileName,
    path.join(__dirname, '../lib/index.css')
  ).then(() => {
    fs.removeSync(tmpFileName);

    console.log('Generated lib/index.css');
  });
};
