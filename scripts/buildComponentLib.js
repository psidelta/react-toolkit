/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
