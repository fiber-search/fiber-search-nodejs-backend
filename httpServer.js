const CONFIG = require('./config.js')
const Link = require('./modules/link.js');
const dbModels = require('./db/models.js')

function setup(server) {
    server.on('request', (request, response) => {
        var responseObj = {};

        var reqLink = new Link(`https://example.com${request.url}`);
        switch (reqLink.params.type) {
            case "record":
                var recordUrl = new Link(reqLink.params.url).pure();
                CONFIG.SHOW_RECORD_URL ? console.log(recordUrl) : console.log("A new record.");
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
}

module.exports = { setup };
