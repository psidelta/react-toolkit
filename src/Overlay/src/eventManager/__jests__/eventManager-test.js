import eventManager from '../eventManager';

describe('eventManager', () => {
  const clickEvent = new CustomEvent('click', { bubbles: true });
  const mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
  const mouseleaveEvent = new CustomEvent('mouseleave', { bubbles: true });

  // inject the HTML fixture for the tests
  beforeEach(() => {
    const fixture = `<div id="fixture">
        <div id="target1" class="tooltip">
          target 1
          <div id="target-1-1">
            Hello from target 1 1
          </div>
        </div>
        <div id="target2" class="tooltip"> target 2 </div>
        <div id="target3"> target 3 </div>

        <div id="overlay">
          hello world
          <div id="tooltipChild">hello from tooltip child</div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  // remove the html fixture from the DOM
  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('registeres showEvent on document and calls onShow only on if matches target', () => {
    const onShow = sinon.spy();
    const manager = eventManager({
      onShow,
      target: '.tooltip',
      showEvent: ['click', 'mouseenter']
    });

    const target1 = document.getElementById('target1');
    const target2 = document.getElementById('target2');
    const target3 = document.getElementById('target3');

    target1.dispatchEvent(clickEvent);
    expect(onShow.called).toBe(true);

    target2.dispatchEvent(mouseenterEvent);
    expect(onShow.calledTwice).toBe(true);

    // not called on unmatched element
    target3.dispatchEvent(clickEvent);
    target3.dispatchEvent(mouseenterEvent);
    expect(onShow.calledTwice).toBe(true);

    manager.unregister();
  });

  it('registeres onHide on document and calls onHide only on if matches target', () => {
    const onHide = sinon.spy();
    const manager = eventManager({
      onHide,
      target: '.tooltip',
      hideEvent: ['click', 'mouseenter']
    });

    const target1 = document.getElementById('target1');
    const target2 = document.getElementById('target2');
    const target3 = document.getElementById('target3');

    target1.dispatchEvent(clickEvent);
    expect(onHide.called).toBe(true);

    target2.dispatchEvent(mouseenterEvent);
    expect(onHide.calledTwice).toBe(true);

    // not called on unmatched element
    target3.dispatchEvent(clickEvent);
    target3.dispatchEvent(mouseenterEvent);
    expect(onHide.calledTwice).toBe(true);

    manager.unregister();
  });

  it('removes events registered on document', () => {
    const onShow = sinon.spy();
    const onHide = sinon.spy();
    const target1 = document.getElementById('target1');
    const target2 = document.getElementById('target2');

    const manager = eventManager({
      onShow,
      onHide,
      target: '.tooltip',
      hideEvent: ['click', 'mouseenter'],
      showEvent: ['mouseleave', 'mouseenter']
    });

    manager.unregister();

    target1.dispatchEvent(clickEvent);
    expect(onShow.called).toBe(false);
    expect(onHide.called).toBe(false);

    target2.dispatchEvent(mouseenterEvent);
    expect(onShow.called).toBe(false);
    expect(onHide.called).toBe(false);
  });

  it('if showEvent and hideEvent have an event in common it toggles between onShow and onHide', () => {
    const onShow = sinon.spy();
    const onHide = sinon.spy();
    const target1 = document.getElementById('target1');
    let visible = false;

    const manager = eventManager({
      onShow,
      onHide,
      getVisible: () => visible,
      getActiveTargetNode: () => target1,
      target: '.tooltip',
      hideEvent: ['click', 'mouseenter'],
      showEvent: ['click', 'mouseenter']
    });

    target1.dispatchEvent(clickEvent);
    expect(onShow.called).toBe(true);
    expect(onHide.called).toBe(false);
    visible = true;

    target1.dispatchEvent(clickEvent);
    expect(onShow.calledOnce).toBe(true);
    expect(onHide.calledOnce).toBe(true);
    visible = false;

    target1.dispatchEvent(mouseenterEvent);
    expect(onShow.calledTwice).toBe(true);
    expect(onHide.calledOnce).toBe(true);
    visible = true;

    target1.dispatchEvent(mouseenterEvent);
    expect(onShow.calledTwice).toBe(true);
    expect(onHide.calledTwice).toBe(true);

    manager.unregister();
  });

  describe('hideOnClickOutside', () => {
    it('calls onHide when a click is registered outside of active target or tooltip', () => {
      const onHide = sinon.spy();
      const overlayNode = document.getElementById('overlay');
      const targetNode = document.getElementById('target1');

      const targetNodeChild = document.getElementById('target-1-1');
      const tooltipChild = document.getElementById('tooltipChild');

      const getOverlayNode = sinon.stub().returns(overlayNode);
      const getActiveTargetNode = sinon.stub().returns(targetNode);

      const manager = eventManager({
        onHide,
        target: '.tooltip',
        hideOnClickOutside: true,
        getOverlayNode,
        getActiveTargetNode
      });

      // click on different item
      expect(onHide.called).toBe(false);
      const target2 = document.getElementById('target2');
      target2.dispatchEvent(clickEvent);
      expect(onHide.called).toBe(true);

      // not called when is tooltip or target
      targetNode.dispatchEvent(clickEvent);
      overlayNode.dispatchEvent(clickEvent);
      expect(onHide.calledOnce).toBe(true);

      // not called from a child of tooltip or target
      targetNodeChild.dispatchEvent(clickEvent);
      tooltipChild.dispatchEvent(clickEvent);
      expect(onHide.calledOnce).toBe(true);

      // called when document is clicked
      document.dispatchEvent(clickEvent);
      expect(onHide.calledTwice).toBe(true);

      manager.unregister();

      // also check it unregisteres
      document.dispatchEvent(clickEvent);
      expect(onHide.calledTwice).toBe(true);

      // getters
      expect(getOverlayNode.called).toBe(true);
      expect(getActiveTargetNode.called).toBe(true);
    });
  });

  describe('hideOnScroll', () => {
    it('calls onHide onscroll', () => {
      const onHide = sinon.spy();
      const manager = eventManager({
        onHide,
        target: '.tooltip',
        hideOnScroll: true,
        getVisible: () => true
      });

      const scrollEvent = new CustomEvent('scroll', { bubbles: true });
      document.dispatchEvent(scrollEvent);
      expect(onHide.calledOnce).toBe(true);

      manager.unregister();

      document.dispatchEvent(scrollEvent);
      expect(onHide.calledOnce).toBe(true);
    });
    it('it doesnt call onHide when false on scroll', () => {
      const onHide = sinon.spy();
      const manager = eventManager({
        onHide,
        target: '.tooltip',
        hideOnScroll: false,
        getVisible: () => true
      });

      const scrollEvent = new CustomEvent('scroll', { bubbles: true });
      document.dispatchEvent(scrollEvent);
      expect(onHide.called).toBe(false);

      manager.unregister();
    });
  });

  describe('target as node', () => [
    it('registers onShow and onHide when target is a dom element', () => {
      const onHide = sinon.spy();
      const onShow = sinon.spy();
      const target1 = document.getElementById('target1');

      const manager = eventManager({
        onHide,
        onShow,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: target1
      });

      target1.dispatchEvent(mouseenterEvent);
      expect(onShow.called).toBe(true);
      target1.dispatchEvent(mouseleaveEvent);
      expect(onHide.called).toBe(true);

      manager.unregister();
    })
  ]);

  describe('popover domNode show|hide events', () => {
    it('should trigger onShow on overlay onMouseenter if hideEvents has mouseleave', () => {
      const onShow = sinon.spy();
      const overlay = document.getElementById('overlay');
      const target1 = document.getElementById('target1');

      overlay.test = true;
      const manager = eventManager({
        onShow,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getOverlayNode: () => overlay,
        getActiveTargetNode: () => target1
      });

      overlay.dispatchEvent(mouseenterEvent);
      expect(onShow.called).toBe(true);

      manager.unregister();
    });
    it('should trigger onHide on overlay onMouseleave if hideEvents has mouseleave', () => {
      const onHide = sinon.spy();
      const onShow = sinon.spy();
      const overlay = document.getElementById('overlay');
      const target1 = document.getElementById('target1');

      const manager = eventManager({
        onHide,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getOverlayNode: () => overlay,
        getActiveTargetNode: () => target1
      });

      overlay.dispatchEvent(mouseleaveEvent);
      expect(onHide.called).toBe(true);

      manager.unregister();
    });
  });
});
