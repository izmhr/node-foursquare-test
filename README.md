# README.md

This is a test project for node-foursquare module.

### Configure

First, don't miss installing needed modules

```
npm install
```

And then, fill your app settings to `routes/config.js`. This file is called when node-foursquare object is created and used to access all FourSquare APIs.

```
// routes/config.js
module.exports = {
  'secrets' : {
    'clientId' : 'YOUR_CLIENT_ID',
    'clientSecret' : 'YOUR_CLIENT_SECRET',
    'redirectUrl' : 'http://localhost:3000/callback' // This should also be set in your OAuth profile.
  }
};
```

### notice

This project cares nothing about session control.