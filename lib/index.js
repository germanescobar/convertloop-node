const Person = require('./convertloop/person')
const EventLog = require('./convertloop/eventLog')
const request = require('superagent');
const url = require('url');
const pjson = require('../package.json');

var Client = function(config) {

  if (!config.app_id) {
    throw new TypeError("Missing Key: app_id")
  }

  if (!config.api_key) {
    throw new TypeError("Missing Key: app_key")
  }

  this.host = config.host || 'http://api.convertloop.dev'
  this.version = config.version || 'v1'
  this.app_id = config.app_id
  this.api_key = config.api_key
  this.people = this.createPerson()
  this.event_logs = this.createEventLog()
}

Client.prototype = {
  defaultCallback: function(err, data) {
    console.log(data.body)
  },
  createPerson() {
    return new Person(this)
  },
  createEventLog() {
    return new EventLog(this)
  },
  post(resource, body, callback) {
    var uri = url.parse(`${this.url()}${resource}`)
    request
    .post(uri)
    .accept('application/json')
    .set('Content-Type', 'application/json')
    .set('X-API-Source', `node-${pjson.version}`)
    .auth(`${this.app_id}`,`${this.api_key}`)
    .send(body)
    .end((err, data) => {
      return callback ? callback(err, data) : this.defaultCallback(err, data)
    });
  },
  url() {
    return `${this.host}/${this.version}`
  }
}

module.exports = Client
