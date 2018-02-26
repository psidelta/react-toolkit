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

function getFocusableElements(node) {
  if (!node) {
    return null;
  }
  const selector = 'input, select, textarea, button, object, a[href], [tabindex]';
  // filter out nonvisible items
  let nodes = [...node.querySelectorAll(selector)];
  // http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
  nodes = nodes.filter(el => el.offsetParent);
  return nodes;
}

export default getFocusableElements;
