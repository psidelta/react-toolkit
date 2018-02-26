'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shallowequal = require('./shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (inst, nextProps, nextState) {
  var props = inst.props;
  var state = inst.state;

  if (nextProps.shouldComponentUpdate) {
    return nextProps.shouldComponentUpdate({
      nextProps: nextProps,
      props: props,
      nextState: nextState,
      state: state
    });
  }

  return !(0, _shallowequal2.default)(nextProps, props) || !(0, _shallowequal2.default)(nextState, state);
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