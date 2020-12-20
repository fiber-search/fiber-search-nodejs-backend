const http = require('http');

const Link = require('./modules/link.js');

const PORT = 48534;
const SHOW_RECORD_URL = true;

var server = http.createServer();
var redis = require('redis').createClient();

server.on('request', (request, response) => {
    var responseObj = {};

    var reqLink = new Link(`https://example.com${request.url}`);
    switch (reqLink.params.type) {
        case "record":
            var recordUrl = new Link(reqLink.params.url).pure();
            SHOW_RECORD_URL ? console.log(recordUrl) : console.log("A new record.");
            responseObj = { status: "success", url: recordUrl };
            break;

        case "s":
            var keyword = reqLink.params['s'];
            console.log(`A new search: ${keyword}.`)
            responseObj = { status: "success", s: keyword };
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
