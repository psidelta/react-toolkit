const chai = require('chai')
const expect = chai.expect
const path = require('path')
const fs = require('fs')
const getComponentNames = require('../scripts/getComponentNames')

describe('lib', () => {
  it('should exist', () => {
    const libPath = path.resolve(
      __dirname,
      '..',
      'lib'
    )
    expect(fs.existsSync(libPath))
      .to.be.true
  })
  describe('components', () => {
    it('all components should exist', (done) => {
      getComponentNames().then((compNames) => {
        expect(
          compNames.filter((compName) => {
            const compPath = path.resolve(
              __dirname,
              '..',
              'lib',
              compName
            )
            return fs.existsSync(compPath)
          })
        )
        .to.have.length(compNames.length)
        done()
      })
    })
    it('common should exist', () => {
      const commonPath = path.resolve(
        __dirname, '..', 'lib', 'common'
      )
      expect(fs.existsSync(commonPath)).to.be.true
    })
    it('package.json should exist', () => {
      const commonPath = path.resolve(
        __dirname, '..', 'lib', 'package.json'
      )
      expect(fs.existsSync(commonPath)).to.be.true
    })
    it('global index.js should exist', () => {
      const commonPath = path.resolve(
        __dirname, '..', 'lib', 'index.js'
      )
      expect(fs.existsSync(commonPath)).to.be.true
    })
  })
})
