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

const fs = require('fs');
const resolve = require('path').resolve;
const pachageJSON = require('../package.json');

function buildGlobalPackageJSON() {
  const toDelete = ['devDependencies', 'scripts', 'private'];
  toDelete.forEach(key => delete pachageJSON[key]);
  const content = JSON.stringify(pachageJSON, null, 2);
  const path = resolve(__dirname, '..', 'lib', 'package.json');
  fs.writeFileSync(path, content, 'utf8', err => {
    if (err) {
      console.log(err);
    }
  });

  return Promise.resolve(true);
}

module.exports = buildGlobalPackageJSON;
