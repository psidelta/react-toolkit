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
 * Find common events, and remove them fron the original
 * kist
 * @param  {String[]} showEvent
 * @param  {String[]} hideEvent
 * @return {{ normalizedShowEvents normalizedHideEvents toggleEvents }}            [description]
 */
function separateEvents({ showEvent, hideEvent }) {
  if (!Array.isArray(showEvent) || !Array.isArray(hideEvent)) {
    return {};
  }

  let normalizedShowEvents = [...showEvent];
  let normalizedHideEvents = [...hideEvent];
  const toggleEvents = [];

  // it is enough to iterate through one of the event
  // lists
  normalizedShowEvents.forEach((eventName, index) => {
    const searchIndex = normalizedHideEvents.indexOf(eventName);
    if (searchIndex !== -1) {
      toggleEvents.push(eventName);
      delete normalizedShowEvents[index];
      delete normalizedHideEvents[searchIndex];
    }
  });

  normalizedShowEvents = normalizedShowEvents.filter(eventName => eventName);
  normalizedHideEvents = normalizedHideEvents.filter(eventName => eventName);

  return {
    normalizedShowEvents,
    normalizedHideEvents,
    toggleEvents
  };
}

export default separateEvents;
