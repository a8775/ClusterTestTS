import * as cluster from 'cluster';
import * as http from 'http';

if (cluster.isMaster) {
    //var numWorkers = require('os').cpus().length;
    var numWorkers = 2;

    console.log('Master: cluster setting up ' + numWorkers + ' workers...');

    cluster.on('online', (worker: cluster.Worker) => {
        console.log('Master: Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker: any, code: any, signal: any) {
        console.log('Master: Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Master: Starting a new worker');
        cluster.fork();
    });

    cluster.on("dicconnect", (worker: cluster.Worker) => {
        console.log('Master: Worker ' + worker.process.pid + ' disconnected');
    });

    cluster.on("fork", (worker: cluster.Worker) => {
        console.log('Master: Worker ' + worker.process.pid + ' forked');
    });

    cluster.on("listening", (worker: cluster.Worker) => {
        console.log('Master: Worker ' + worker.process.pid + ' listening');
    });

    cluster.on("errpr", (err: any) => {
        console.log('Master: Worker error!');
    });

    for (var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
}
else {
    console.log(`Worker ${process.pid}: starting...`);

    var server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
        var body = "";

        request.on("data", (chunk: string | Buffer): void => {
            body += chunk;
        });

        request.on("end", () => {
            let res = `Worker ${process.pid}: ${request.url}, ${body}, ${request.connection.localPort}-${request.connection.remotePort} `;
            console.log(res);
            response.end(res);
        });
    });

    let PORT = 9090;
    server.listen(PORT, () => {
        console.log(`Worker ${process.pid}: Server listening on: http://localhost:%s`, PORT);
    });
}