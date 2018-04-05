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

const path = require('path');
const pify = require('pify');
const fsExtra = require('fs-extra');
const exec = require('child_process').exec;
const globby = require('globby');

function buildComponentLib(compName) {
  if (!compName) {
    throw 'No component name specified! You should use --module=CompName.';
  }
  const modulePath = path.resolve(__dirname, '../src/', compName);
  const modulePathSrc = path.resolve(modulePath, 'src');
  const modulePathStyle = path.resolve(modulePath, 'style');
  const moduleLibPath = path.resolve(__dirname, '..', 'lib', compName);

  const moduleLibSrcPath = path.resolve(moduleLibPath, 'src');

  const command = `babel --out-dir ${moduleLibSrcPath} ${modulePathSrc}`;
  const buildPromise = pify(exec)(command);

  return buildPromise
    .then(data => {
      // build index & other js files

      const list = globby.sync('**.js', { cwd: modulePath });
      const promises = list.map(file => {
        const command = `babel ${modulePath}/${file} --out-file ${moduleLibPath}/${file}`;
        return pify(exec)(command);
      });

      const outputModulePathStyle = path.resolve(moduleLibPath, 'style');

      if (fsExtra.existsSync(modulePathStyle)) {
        promises.push(
          fsExtra.emptyDir(outputModulePathStyle).then(() => {
            return fsExtra.copy(modulePathStyle, outputModulePathStyle);
          })
        );
      }

      return Promise.all(promises);
    })
    .catch(err => console.log(err));
}

module.exports = buildComponentLib;
