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
function registerListeners({ events, action }) {
  events.forEach(eventName => {
    // as it doesn't bubble we have to catch in capture
    if (
      eventName === 'mouseenter' ||
      eventName === 'mouseleave' ||
      eventName === 'scroll'
    ) {
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
function unregisterListeners({ events, action }) {
  events.forEach(eventName => {
    if (
      eventName === 'mouseenter' ||
      eventName === 'mouseleave' ||
      eventName === 'scroll'
    ) {
      document.removeEventListener(eventName, action, { capture: true });
    } else {
      document.removeEventListener(eventName, action);
    }
  });
}

export { registerListeners, unregisterListeners };
