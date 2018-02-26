const Server = require('karma').Server
const config = require('../karma.build.conf.js')
const getAllSrcFolderNames = require('./getAllSrcFolderNames')

getAllSrcFolderNames().then((folders) => {
  folders.forEach((folder) => {
    const filesPattern = __dirname + '/src/' + folder + '/**/*-test.js'
    const server = new Server(config({ filesPattern }), function(exitCode) {
      console.log('Karma has exited with ' + exitCode)
      process.exit(exitCode)
    })

    server.start()
  })
})
