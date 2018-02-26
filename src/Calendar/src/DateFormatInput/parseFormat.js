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
import assign from '../../../common/assign';
import FORMATS from './formats';

const SUGGESTIONS = {
  Y: ['YYYY', 'YY'],
  M: ['MM'],
  D: ['DD'],
  H: ['HH'],
  h: ['hh'],
  m: ['mm'],
  s: ['ss']
};

export default format => {
  let index = 0;
  let positionIndex = 0;

  let suggestions;
  let suggestionMatch;

  const positions = [];
  const matches = [];

  while (index < format.length) {
    const char = format[index];
    const match = FORMATS[char];
    let matchObject;

    suggestionMatch = null;
    suggestions = SUGGESTIONS[char];

    if (!match && !suggestions) {
      positions[positionIndex] = char;
      matches.push(char);
    } else {
      if (suggestions && suggestions.length) {
        // it might be a longer match
        suggestionMatch = suggestions.filter(s => format.substr(index, s.length) == s)[0];
      }

      if (!suggestionMatch) {
        if (!FORMATS[char]) {
          console.warn(`Format ${char} is not supported yet!`);
          if (suggestions) {
            console.warn(`Use one of ["${suggestions.join(',')}"]`);
          }
          positions[positionIndex] = char;
          matches.push(char);
        } else {
          // we found a match, with no other suggestion

          const currentFormat = FORMATS[char];
          let start = positionIndex;
          const end = positionIndex + (currentFormat.length || 1) - 1;

          matchObject = assign({}, currentFormat, { format: char, start, end });

          for (; start <= end; start++) {
            positions[positionIndex] = matchObject;
            positionIndex++;
          }
          index++;
          matches.push(matchObject);
          continue; // to skip incrementing twice
        }
      } else {
        matchObject = assign({}, FORMATS[suggestionMatch], {
          format: suggestionMatch,
          start: positionIndex
        });
        matches.push(matchObject);

        const endIndex = positionIndex + suggestionMatch.length;

        matchObject.end = endIndex - 1;
        while (positionIndex < endIndex) {
          positions[positionIndex] = matchObject;
          positionIndex++;
          index++;
        }
        continue; // to skip incrementing index once more
      }
    }

    positionIndex++;
    index++;
  }

  return { positions, matches };
};
