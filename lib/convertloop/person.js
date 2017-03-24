function Person(client) {
  if (!client) {
    throw new Error('No client Provided')
  }
  
  this.create_or_update = function(args, callback) {
    if (!args) {
      throw new TypeError('No args provided')
    }
    if (!args.pid && !args.user_id && !args.email) {
      throw new TypeError("You must provided at least one of the following keys: 'pid' (to update), or 'user_id' and/or 'email' (to create or update) ")
    }

    client.post('/people', args, callback)
  }
}

module.exports = Person
