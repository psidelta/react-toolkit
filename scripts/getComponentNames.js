/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
