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

import updateSizeWithDirection from '../updateSizeWithDirection';

describe('updateSizeWithDirection', () => {
  it('updates corect for direction top', () => {
    expect(
      updateSizeWithDirection({
        position: { top: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'up',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 0, width: 10 },
      position: { top: 0, left: 0 }
    });
    expect(
      updateSizeWithDirection({
        position: { bottom: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'up',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 0, width: 10 },
      position: { bottom: 10, left: 0 }
    });
  });
  it('updates corect for direction down', () => {
    expect(
      updateSizeWithDirection({
        position: { top: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'down',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 20, width: 10 },
      position: { top: 0, left: 0 }
    });
    expect(
      updateSizeWithDirection({
        position: { bottom: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'down',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 20, width: 10 },
      position: { bottom: -10, left: 0 }
    });
  });
  it('updates corect for direction left', () => {
    expect(
      updateSizeWithDirection({
        position: { top: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'left',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 10, width: 0 },
      position: { top: 0, left: 0 }
    });
    expect(
      updateSizeWithDirection({
        position: { bottom: 0, right: 0 },
        size: { width: 10, height: 10 },
        direction: 'left',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 10, width: 0 },
      position: { bottom: 0, right: 10 }
    });
  });
  it('updates corect for direction right', () => {
    expect(
      updateSizeWithDirection({
        position: { top: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'right',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 10, width: 20 },
      position: { top: 0, left: 0 }
    });
    expect(
      updateSizeWithDirection({
        position: { bottom: 0, right: 0 },
        size: { width: 10, height: 10 },
        direction: 'right',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 10, width: 20 },
      position: { bottom: 0, right: -10 }
    });
  });
});
