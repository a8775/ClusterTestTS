import * as cluster from 'cluster';

if (cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master: cluster setting up ' + numWorkers + ' workers...');

    for (var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker: any) {
        console.log('Master: Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker: any, code: any, signal: any) {
        console.log('Master: Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Master: Starting a new worker');
        cluster.fork();
    });
}
else {
    console.log(`Worker ${process.pid}: starting...`);
    var http = require('http');

    function handleRequest(request: any, response: any) {
        let res = `Worker ${process.pid}: It Works!! Path Hit: ` + request.url;
        console.log(res);
        response.end(res);
    }

    var server = http.createServer(handleRequest);

    let PORT = 9090;
    server.listen(PORT, () => {
        console.log(`Worker ${process.pid}: Server listening on: http://localhost:%s`, PORT);
    });
}