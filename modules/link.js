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
        this.params = ((params) => {
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

    pure() {
        return `${this.protocol}//${this.hostname}${(() => {
            if (this.port) {
                if (this.port == "80") {
                    return "";
                } else {
                    return ":" + this.port;
                }
            } else {
                return "";
            }
        })()}${(() => {
            var pathStr = "";
            for (let i = 0; i < this.path.length; i++) {
                pathStr = pathStr + "/" + this.path[i];
            }
            return pathStr;
        })()}`;
    };
}

module.exports = Link;
