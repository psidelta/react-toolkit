'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

/**
 * Registers events listeners on document
 * @param  {String[]} events Dom event names
 * @param  {function} action event handler
 * @return {Void}
 */
function registerListeners(_ref) {
  var events = _ref.events,
      action = _ref.action;

  events.forEach(function (eventName) {
    // as it doesn't bubble we have to catch in capture
    if (eventName === 'mouseenter' || eventName === 'mouseleave' || eventName === 'scroll') {
      document.addEventListener(eventName, action, { capture: true });
    } else {
      document.addEventListener(eventName, action);
    }
  });
}

/**
 * Removes event listeners on document
 * @param  {String[]} events Dom event names
 * @param  {function} action event handler
 * @return {Void}
 */
function unregisterListeners(_ref2) {
  var events = _ref2.events,
      action = _ref2.action;

  events.forEach(function (eventName) {
    if (eventName === 'mouseenter' || eventName === 'mouseleave' || eventName === 'scroll') {
      document.removeEventListener(eventName, action, { capture: true });
    } else {
      document.removeEventListener(eventName, action);
    }
  });
}

exports.registerListeners = registerListeners;
exports.unregisterListeners = unregisterListeners;