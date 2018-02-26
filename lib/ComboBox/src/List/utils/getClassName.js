'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _join = require('../../utils/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getClassName(_ref) {
  var props = _ref.props,
      _ref$state = _ref.state,
      state = _ref$state === undefined ? {} : _ref$state;
  var listPosition = props.listPosition,
      _props$data = props.data,
      data = _props$data === undefined ? [] : _props$data,
      className = props.className,
      rootClassName = props.rootClassName,
      loading = props.loading,
      relativeToViewport = props.relativeToViewport;
  var succesfullPosition = state.succesfullPosition;


  var constructedClassName = (0, _join2.default)(rootClassName, className, listPosition && rootClassName + '--' + listPosition, loading && rootClassName + '--loading', relativeToViewport && rootClassName + '--relative-to-viewport', data && !data.length && rootClassName + '--empty');

  if (succesfullPosition) {
    var positionName = succesfullPosition === 'bc-tc' ? 'top' : 'bottom';
    constructedClassName = (0, _join2.default)(constructedClassName, rootClassName + '--position-' + positionName);
  }

  return constructedClassName;
} /**
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

exports.default = getClassName;