/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import equal from '../../common/shallowequal';

export default (inst, nextProps, nextState) => {
  const props = inst.props;
  const state = inst.state;

  if (nextProps.shouldComponentUpdate) {
    return nextProps.shouldComponentUpdate({
      nextProps,
      props,
      nextState,
      state
    });
  }

  return true;
};
