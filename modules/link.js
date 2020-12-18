class Link {
    constructor(source) {
        this.url = new URL(source);

        this.protocol = this.url.protocol;
        this.hostname = this.url.hostname;
        this.port = this.url.port;
        this.path = ((pathname) => {
            pathname = pathname.replace(/\\/g, '/');
            var pathArr = pathname.split('/');
            var result = [];
            for (let i = 0; i < pathArr.length; i++) {
                const item = pathArr[i];
                if (item) {
                    result[result.length] = item;
                }
            }
            return result;

        })(this.url.pathname);
        this.hash = this.url.hash;
        this.search = ((params) => {
            var result = {};
            params.forEach((value, key) => {
                result[key] = value;
            })
            return result;
        })(this.url.searchParams)
    };
    url;
    protocol;
    hostname;
    port;
    path;
    hash;
    params;
}

export default Link;
