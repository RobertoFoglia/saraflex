const ipc = require('node-ipc')

function init(socketName, dispatcher) {
  ipc.config.id = socketName
  ipc.config.silent = true

  ipc.serve(() => {
    ipc.server.on('message', (data, socket) => {
      let msg = JSON.parse(data)
      let {id, serviceUri, args } = msg

      dispatcher.dispatch(serviceUri, args).subscribe(
        result => {
          ipc.server.emit(
            socket,
            'message',
            JSON.stringify({ type: 'reply', id, result })
          )
        },
        error => {
          // Up to you how to handle errors, if you want to forward
          // them, etc
          ipc.server.emit(
            socket,
            'message',
            JSON.stringify({ type: 'error', id })
          )
          throw error
        }
      )

    })
  })

  ipc.server.start()
}

function send(name, args) {
  ipc.server.broadcast('message', JSON.stringify({ type: 'push', name, args }))
}

module.exports = { init, send }
