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
 * Remove false keys from an object.
 * It mutates the object!.
 * @param  {Object} props
 * @return {Void}
 */
function cleanUpFalseProps(props) {
  Object.keys(props).forEach(path => {
    if (props[path] === false) {
      delete props[path];
    }
  });
}

export default cleanUpFalseProps;
