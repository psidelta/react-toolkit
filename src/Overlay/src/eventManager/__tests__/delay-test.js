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

import eventManager from '../eventManager';

describe('eventManager delays', () => {
  const clickEvent = new CustomEvent('click', { bubbles: true });
  const mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
  const mouseleaveEvent = new CustomEvent('mouseleave', { bubbles: true });
  let clock;

  // inject the HTML fixture for the tests
  beforeEach(() => {
    const fixture = `<div id="fixture1">
        <div id="target1" class="tooltip">
          target 1
        </div>
        <div id="target2" class="tooltip"> target 2 </div>
        <div id="target3"> target 3 </div>
        <div id="tooltip">
          Hello world from tooltip
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', fixture);

    clock = sinon.useFakeTimers();
  });

  // remove the html fixture from the DOM
  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture1'));
    clock.restore();
  });

  it('onShow is called after showDelay ms', () => {
    const onShow = sinon.spy();
    const targetNode = document.getElementById('target1');
    const manager = eventManager({
      onShow,
      showEvent: ['mouseenter'],
      target: '.tooltip',
      getShowDelay: () => 300
    });

    targetNode.dispatchEvent(mouseenterEvent);
    clock.tick(100);
    expect(onShow.called).to.be.false;

    clock.tick(350);
    expect(onShow.called).to.be.true;

    manager.unregister();
  });

  it('onHide is called after hideDelay ms', () => {
    const onHide = sinon.spy();
    const targetNode = document.getElementById('target1');
    const manager = eventManager({
      onHide,
      hideEvent: ['mouseenter'],
      target: '.tooltip',
      getHideDelay: () => 300
    });

    targetNode.dispatchEvent(mouseenterEvent);
    clock.tick(100);
    expect(onHide.called).to.be.false;

    clock.tick(350);
    expect(onHide.called).to.be.true;

    manager.unregister();
  });

  describe('showDelay and hideDelay interaction', () => {
    // case 1
    it("onShow dom event doesn't scheduled another onShow", () => {
      const overlayNode = document.getElementById('tooltip');
      const targetNode = document.getElementById('target1');

      const onShow = sinon.spy();
      const manager = eventManager({
        getOverlayNode: () => overlayNode,
        getActiveTargetNode: () => targetNode,
        onShow,
        showEvent: ['mouseenter'],
        target: '.tooltip',
        getShowDelay: () => 300
      });

      targetNode.dispatchEvent(mouseenterEvent);
      clock.tick(200);

      targetNode.dispatchEvent(mouseenterEvent);
      expect(onShow.called).to.be.false;
      clock.tick(400);
      expect(onShow.calledOnce).to.be.true;

      targetNode.dispatchEvent(mouseenterEvent);
      clock.tick(900);
      expect(onShow.calledTwice).to.be.true;

      manager.unregister();
    });

    // case 2
    it('onShow domEvent from another target cancels previous one and schedules the other', () => {
      const overlayNode = document.getElementById('tooltip');
      const targetNode = document.getElementById('target1');
      const target2 = document.getElementById('target2');

      const onShow = sinon.spy();
      const manager = eventManager({
        onShow,
        getOverlayNode: () => overlayNode,
        getActiveTargetNode: () => targetNode,
        showEvent: ['mouseenter'],
        target: '.tooltip',
        getShowDelay: () => 300
      });

      // trigger mouseenter from targetNode
      targetNode.dispatchEvent(mouseenterEvent);
      clock.tick(100);

      // trigger mouseneter form another target
      const newTargetMouseEnterEvent = new CustomEvent('mouseenter', { bubbles: true });
      target2.dispatchEvent(newTargetMouseEnterEvent);

      clock.tick(600);
      expect(onShow.calledOnce).to.be.true;
      expect(onShow.args[0][0].target).to.equal(target2);

      manager.unregister();
    });

    // case 3
    it('domHide event cancels a scheduled onShow event', () => {
      const targetNode = document.getElementById('target1');

      const onShow = sinon.spy();
      const onHide = sinon.spy();
      const manager = eventManager({
        onShow,
        onHide,

        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getShowDelay: () => 300,
        getHideDelay: () => 300
      });

      targetNode.dispatchEvent(mouseenterEvent);
      clock.tick(100);
      targetNode.dispatchEvent(mouseleaveEvent);
      clock.tick(400);

      expect(onShow.called).to.be.false;

      manager.unregister();
    });

    // case 4 - is shold not do anything

    // case 5
    it('onHide domEvent will not schedule another onHide when there is already one ongoing from same target', () => {
      const targetNode = document.getElementById('target1');

      const onShow = sinon.spy();
      const onHide = sinon.spy();
      const manager = eventManager({
        onShow,
        onHide,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getShowDelay: () => 300,
        getHideDelay: () => 300
      });

      targetNode.dispatchEvent(mouseleaveEvent);
      clock.tick(100);
      targetNode.dispatchEvent(mouseleaveEvent);
      clock.tick(200);
      expect(onHide.calledOnce).to.be.true;
      clock.tick(400);
      expect(onHide.calledOnce).to.be.true;

      manager.unregister();
    });

    // case 6 - noting to do

    // case 7
    it('onShow domEvent will cancel a scheduled onHide', () => {
      const targetNode = document.getElementById('target1');
      const target2 = document.getElementById('target2');

      const onShow = sinon.spy();
      const onHide = sinon.spy();
      const manager = eventManager({
        onShow,
        onHide,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getShowDelay: () => 300,
        getHideDelay: () => 300
      });

      targetNode.dispatchEvent(mouseleaveEvent);
      clock.tick(100);
      target2.dispatchEvent(mouseenterEvent);
      clock.tick(400);

      expect(onHide.called).to.be.false;

      manager.unregister();
    });
  });
});
