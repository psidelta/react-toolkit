/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const pify = require('pify');
const fs = require('fs');
const path = require('path');

function getComponentNames() {
  return pify(fs.readdir)('./src')
    .then(files => {
      const compPaths = files.map(fileName => {
        const compDirPath = path.resolve('./src', fileName);
        if (!fs.lstatSync(compDirPath).isDirectory()) {
          return null;
        }

        // all are componets besides common
        return fileName !== 'common' &&
          fileName !== 'CustomComponent' &&
          fileName !== 'app' //&&
          ? // fileName !== 'RadioButtonGroup'
            fileName
          : null;
      });

      return Promise.all(compPaths);
    })
    .then(data => data.filter(compName => compName));
}

module.exports = getComponentNames;
