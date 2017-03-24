function EventLog(client) {
  if (!client) {
    throw new Error('No client Provided')
  }

  this.send = function(args, callback) {
    if (!args) {
      throw new TypeError('No args provided')
    }
    if (!args.name) {
      throw new TypeError("No event name provided")
    }

    client.post('/event_logs', args, callback)
  }
}

module.exports = EventLog
