'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regionAlign = require('@zippytech/region-align');

var _regionAlign2 = _interopRequireDefault(_regionAlign);

var _selectParent = require('./selectParent');

var _selectParent2 = _interopRequireDefault(_selectParent);

var _getViewportRegion = require('./getViewportRegion');

var _getViewportRegion2 = _interopRequireDefault(_getViewportRegion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (constrainTo, domNode) {
  var constrainRegion = void 0;

  if (constrainTo === true) {
    constrainRegion = (0, _getViewportRegion2.default)();
  }

  if (!constrainRegion && typeof constrainTo === 'function') {
    constrainTo = constrainTo(domNode);
  }

  if (!constrainRegion && typeof constrainTo === 'string') {
    constrainTo = (0, _selectParent2.default)(constrainTo, domNode);
  }

  if (!constrainRegion && constrainTo) {
    constrainRegion = _regionAlign2.default.from(constrainTo);
  }

  return constrainRegion;
}; /**
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