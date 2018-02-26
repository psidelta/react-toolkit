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

const rimraf = require('rimraf');
const path = require('path');
const exec = require('child_process').exec;
const fs = require('fs');
const pify = require('pify');
const buildGlobalPackageJSON = require('./buildGlobalPackageJSON');
const buildComponentLib = require('./buildComponentLib');
const buildGlobalIndex = require('./buildGlobalIndex');
const getComponentNames = require('./getComponentNames');
const buildComponentStyle = require('./buildComponentStyle');
const cleanGlobalLib = require('./cleanGlobalLib');
const buildCommon = require('./buildCommon');
const copyThemesList = require('./copyThemesList');

function buildComponent(compName) {
  return buildComponentLib(compName).then(() => buildComponentStyle(compName));
}

const MODULE_NAME = process.env.npm_config_module;
if ('ALL' === MODULE_NAME) {
  cleanGlobalLib()
    .then(() => getComponentNames())
    .then(componentNames => componentNames.map(buildComponent))
    .then(buildGlobalIndex)
    .then(buildCommon)
    .then(buildGlobalPackageJSON)
    .then(copyThemesList)
    .catch(err => console.log(err));
} else {
  buildComponent(MODULE_NAME);
}
