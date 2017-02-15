import * as cluster from 'cluster';

var server = require('./server');

if (cluster.isMaster) {
    var client = require('./client');
}

// infinite run
setInterval(() => { }, 1000);