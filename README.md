### hapi-auth-passthrough

[![Build Status](https://travis-ci.org/diorahman/hapi-auth-passthrough.svg?branch=master)](https://travis-ci.org/diorahman/hapi-auth-passthrough)

Hapi passthrough authentication plugin.

#### Passthrough authentication

Allow all requests to get successful auth replies, with configurable credentials object from the `request.headers`.

For example we have following route in a plugin:

```js

server.route({
    method: 'POST',
    path: '/admin',
    config: {
        auth: {
            strategy: 'default',
            scope: 'admin'
        }
    }
});

```

However, we're not ready yet on our own (custom) `hapi-auth-*` plugin or not yet decided which plugin we will use. But we need to test the plugin.
Hence, in the test, we can register the hapi-auth-passthrough and have a request object to set the scope for the returned credentials object.

```js
var request = {
    ...
    headers: {
        'Pass-Scope': admin // or for multiple scopes: admin, user, wizard
    }
}
```

#### License

MIT
