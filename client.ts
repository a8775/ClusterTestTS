import * as request from 'request';

class ClusterTestClient {
    private url = "http://127.0.0.1:9090/"

    public request<T>(data: any): Promise<T> {
        var self = this;
        return new Promise<T>((resolve: (data: T) => string, reject: (err: any) => void) => {
            var options = {
                url: self.url,
                json: data,
                timeout: 15000
            }

            request.post(options,
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolve(body);
                        return;
                    }
                    reject(new Error("request error: " + JSON.stringify(error)));
                }
            );
        });
    }

    public test() {
    }

    public run(): void {
        setTimeout((async () => {
            try {
                let d = new Date().toISOString();
                console.log("Request: " + d);
                console.log("   -> " + await this.request(d));
            }
            catch (err) {
                console.error("exception: ", err);
            }
            setImmediate(this.run.bind(this));
        }).bind(this), 1000);
    }
}


(new ClusterTestClient()).run();

