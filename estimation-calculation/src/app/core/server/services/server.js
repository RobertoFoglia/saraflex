let serverInstanceHandler = require('./server-instance-handler')
let ipc = require('./web-socket-handler')

let isDev, version

if (process.argv[2] === '--subprocess') {
  isDev = false
  version = process.argv[3]

  let socketName = process.argv[4]
  ipc.init(socketName, serverInstanceHandler.dispatcher)
} else {
  let { ipcRenderer, remote } = require('electron')
  isDev = true
  version = remote.app.getVersion()

  ipcRenderer.on('set-socket', (event, { name }) => {
    ipc.init(name, serverInstanceHandler.dispatcher)
  })
}

console.log(version, isDev)