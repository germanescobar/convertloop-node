# ConvertLoop Node API Client

A Node client of the ConvertLoop REST API. You can sign up for a ConvertLoop account at  https://convertloop.co.

## Installation

### Ruby

1\. Install the gem

```
$ npm install convertloop
```

2\. Configure the `ConvertLoop` object passing your credentials.

```javascript
const Convertloop = require('convertloop-node')

const convertloop = new Convertloop({
  app_id: '0b480968',
  api_key: 'udQeeUujEk8i7xiE9ZaiDij8'
})
```
You are now ready to start calling the API methods!

## Getting Started

### Creating or updating a person

You need to pass at least one of the following: `pid`, `user_id` or `email` to identify a user. Use `pid` when you are updating a guest of your site (you can obtain this value from the cookie `dp_pid`). Use `user_id` to match the `id` of the user in your application.

```javascript
convertloop.people.create_or_update({
  email: "juan.gomez@convertloop.co",
  first_name: "Juan",
  last_name: "Gomez"
}, function(err, data) {
  console.log(err, data.body)
})
```

Any key different to `pid`, `user_id`, `email`, `first_seen_at`, `last_seen_at`, `add_tags`, and `remove_tags` will be treated as a **custom attribute** of the person.

You can add or remove tags using the `add_tags` and `remove_tags` keys:

```javascript
convertloop.people.create_or_update({
  email: "juan.gomez@convertloop.co",
  add_tags: ['Learn Something'],
  remove_tags: ['Lead']
}, function(err, data) {
  console.log(err, data.body)
})
```

### Logging an event

You can log an event for any person:

```javascript
convertloop.event_logs.event_logs.send({
  name: 'Billed',
  person: {email: 'node@node.com'},
  metadata: {
    credits: 1000
  },
  occurred_at: new Date()
}, function(err, data) {
  console.log(data.body)
})
```

If you don't specify the `ocurred_at` key, the current time will be used. You can use the `person` key to add **custom attributes** and **tags** to that person.
