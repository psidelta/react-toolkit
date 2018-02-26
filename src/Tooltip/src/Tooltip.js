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

import React, { Component } from 'react';
import Overlay from '../../Overlay';

class ZippyTooltip extends Component {
  constructor(props) {
    super(props);
    this.setRootRef = ref => (this.rootNode = ref);
  }
  render() {
    return <Overlay ref={this.setRootRef} {...this.props} />;
  }
  show() {
    if (this.rootNode) {
      this.rootNode.show();
    }
  }
  hide() {
    if (this.rootNode) {
      this.rootNode.hide();
    }
  }
}

ZippyTooltip.defaultProps = {
  rootClassName: 'zippy-react-toolkit-tooltip',
  hideOnScroll: true,

  // style
  arrowSize: 7,
  arrow: true,

  // fade
  fade: true,
  showDelay: 250,
  hideDelay: 300,
  fadeInDuration: 150,
  fadeOutDuration: 50,

  useTransform: true,

  // events
  showEvent: ['mouseenter'],
  hideEvent: ['mouseleave']
};

export default ZippyTooltip;
