Backend
=======

Provides access to nodejs and os level interactions for the hubiso tool 

## Installation

To install the latest version of backend

```javascript
$ npm install --save https://bitbucket.org/hubisotool/backend/get/master.tar.gz
```

To install version x.x.x of backend

```javascript
$ npm install --save https://bitbucket.org/hubisotool/backend/get/x.x.x.tar.gz
```

NB: Whereas master.tar.gz contains the latest build of backend, x.x.x.tar.gz contains a stable build of backend

## API

Summary of the API : 

1. Startup
2. Shutdown
3. Creating an alert.

### 1. Startup

Some configuration parameters need to be passed to the backend to have a smooth running application.
* \*datapath : 
Path to a folder where all files for the backend will be kept.

all \* parameters are mandatory
```javascript
var b = require("backend");

var opts = {
    // Get Local Data location from Node Webkit application
   datapath = require('nw.gui').App.dataPath
}

// Start the backend
b.startup(opts)
```

### 2 Shutting down the backend

Do not forget to shutdown the backend on application quit in order to release resources.
Otherwise the application may not close successfully, and hence **may not show a window** on next invocation.

```javascript
var b = require("backend");

// Shutdown the backend
b.shutdown()
```

### 3 Creating an alert

```javascript
var b = require("backend");

// Create a simple alert with title and message
b.alert({ title : "Test alert", text : "This is a test alert generated by Bishaka Samuel"});
```
