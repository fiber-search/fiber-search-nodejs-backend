import http from 'http';

import Link from './modules/link.js';

const PORT = 48534;
const SHOW_RECORD_URL = true;

var server = http.createServer();

server.on('request', (request, response) => {
    var responseObj = {};

    var reqLink = new Link(`https://example.com${request.url}`);
    switch (reqLink.params.type) {
        case "record":
            SHOW_RECORD_URL ? console.log(reqLink.params.url) : console.log("A new record.");
            responseObj = { status: "success", url: reqLink.params.url };
            break;

        default:
            break;
    }

    response.write(JSON.stringify(responseObj));

    response.end();
})

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})