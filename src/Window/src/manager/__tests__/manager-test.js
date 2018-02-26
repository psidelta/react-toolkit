import manager from '../manager'

describe('manager', () => {

  beforeEach(() => {
    manager.reset()
  })

  it('register should return a unique id', () => {
    const window1 = manager.register({})
    const window2 = manager.register({}, 'test')
    const window3 = manager.register({})

    expect(window1).to.not.equal(window2)
    expect(window2).to.not.equal(window3)
  })

  it('getInstance should retrive the instance by id', () => {
    const window1 = { id: 'window1' }
    const id = manager.register(window1)

    expect(id).to.equal(0)
    expect(manager.getWindow(id)).to.equal(window1)
  })

  it('unRegister should remove instance', () => {
    const window = { id: 'window1' }
    const id = manager.register(window)
    manager.register(window)

    expect(manager.unRegister(id)).to.be.true
    expect(manager.getWindow(id)).to.be.null
  })

  describe('getZIndex', () => {
    it('getZIndex should return correct zIndex', () => {
      const window1 = { id: 'window1' }
      const window2 = { id: 'window2' }

      const id1 = manager.register(window1)
      const id2 = manager.register(window2)

      expect(manager.getZIndex(id1)).to.equal(10)
      expect(manager.getZIndex(id2)).to.equal(20)
    })
  })

  describe('setZIndex', () => {
    it('when registers should call setZindex with second param `true`', () => {
      const window1 = { setZIndex: sinon.spy() }
      const id1 = manager.register(window1)

      expect(window1.setZIndex.called).to.be.true
      // expect(window1.setZIndex.args[0][1]).to.be.true
    })

    it('when unregisters it should call setIndex on correct instances', () => {
      const window1 = { setZIndex: sinon.spy() }
      const window2 = { setZIndex: sinon.spy() }
      const window3 = { setZIndex: sinon.spy() }

      const id1 = manager.register(window1)
      const id2 = manager.register(window2)
      const id3 = manager.register(window3)

      manager.unRegister(id1)

      expect(window3.setZIndex.calledTwice).to.be.true
    })

    it('should be called on correct instances when brintToFrontIsCalled', () => {
      const window1 = { setZIndex: sinon.spy() }
      const window2 = { setZIndex: sinon.spy() }
      const window3 = { setZIndex: sinon.spy() }

      const id1 = manager.register(window1)
      const id2 = manager.register(window2)
      const id3 = manager.register(window3)

      manager.bringToFront(id2)

      expect(window3.setZIndex.calledTwice).to.be.true
      // because when window 3 is registered
      // it is called one more time to make sure
      // only one window is on top
      expect(window2.setZIndex.calledThrice).to.be.true
    })
  })
})
