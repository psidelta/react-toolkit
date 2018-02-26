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
 * Searches a string and separates the string by the text it finds
 * matchText: array of parts
 * @param  {String} text   text in which to search
 * @param  {String} queryText   text to search
 * @param  {String} mode search strategy, contains or startsWidth
 * @return {Array} matches e.g. ['hey', {match: 'test'}, 'rest of text']
 */
function hightlightText({ queryText, text, mode = 'contains' }) {
  const regex = mode === 'contains' ?
      new RegExp(queryText, 'gi') :
      new RegExp(`^${queryText}`, 'gi')

  let matchText = [];
  const searchQueryLen = queryText.length
  let localMatch
  let previousLocalMatch

    // while you find a word
    while ((localMatch = regex.exec(text)) !== null) {
      const index = localMatch.index;
      const previousSegmentIndex = previousLocalMatch ?
                                    previousLocalMatch.index + searchQueryLen : 0;

      // text before match
      matchText.push(text.slice(previousSegmentIndex, index));
      matchText.push({
        match: text.slice(localMatch.index, localMatch.index + searchQueryLen)
      });

      previousLocalMatch = localMatch;
    }

    // at the end we apend the rest of the string
  matchText.push(text.slice(previousLocalMatch.index + searchQueryLen));
  matchText = matchText.filter(match => match)

  return matchText
}

export default hightlightText
