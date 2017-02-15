# cluster-test-ts

When the HTTP connection is set to be persistent or keep-alive 
[HTTP persistent connection](https://en.wikipedia.org/wiki/HTTP_persistent_connection)
the master process of nodejs cluster is sending all request to the same cluster worker.

This is the example that shows this property of nodejs.

Please note that under Windows nodejs is not using naive `round-robin` approach for distributing 
requests so it's not easy seen. Under Windows even the new connections (not persistent) are often 
directed to the same cluster worker for some time.

# download and install
Download the repo, compile and prepare docker image:

```
git clone https://github.com/a8775/test-cluster-ts.git
yarn install
tsc -p .
docker build -t my-my .
```

# run under docker
Start docker container:
```
docker run -it my-my bash
```

Run app in container:
```
node index.js
```

# run separate processes for dubuging

```
node server.js
node client.js
```


