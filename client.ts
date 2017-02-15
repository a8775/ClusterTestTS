import * as request from 'request';

class ClusterTestClient {
    private url = "http://127.0.0.1:9090/"

    public request(data: any): Promise<string> {
        var self = this;
        return new Promise<string>((resolve: (data: string) => string, reject: (err: any) => void) => {
            var options = {
                url: self.url,
                body: data,
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

    public run(): void {
        setTimeout((async () => {
            try {
                let d = new Date().toISOString();
                console.log(`Request: ${d} -> ` + await this.request(d));
            }
            catch (err) {
                console.error("exception: ", err);
            }
            setImmediate(this.run.bind(this));
        }).bind(this), 1000);
    }
}


(new ClusterTestClient()).run();

