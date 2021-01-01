const CONFIG = require('../config.js')
const Link = require('../modules/link.js');
const Time = require('../modules/time.js');
const db = require('../db/models.js')

function setup(server) {
    server.on('request', (request, response) => {
        var responseObj = {};
        response.setHeader("Access-Control-Allow-Origin", CONFIG.WEBSITE_FRONTEND_URL);
        function sendResponse() {
            response.write(JSON.stringify(responseObj));
            response.end();
        }

        var reqLink = new Link(`https://example.com${request.url}`);
        switch (reqLink.params.type) {
            case "record":
                var recordUrl = new Link(reqLink.params.url).pure();
                const time = new Time();
                db.browsingHistory.findOne({ url: recordUrl }).then((row) => {
                    if (row) {
                        row.updateOne({ frequency: row.frequency + 1, lastUpdated: time.accurateToDate() }).then(() => {
                            responseObj = { status: "success", firstTime: false };
                            sendResponse();
                        })
                    } else {
                        db.browsingHistory({ url: recordUrl, frequency: 1, lastUpdated: time.accurateToDate() }).save().then(() => {
                            responseObj = { status: "success", firstTime: true };
                            sendResponse();
                        })
                    }
                })

                CONFIG.SHOW_RECORD_URL ? console.log(recordUrl) : console.log("A new record.");
                break;

            case "s":
                var keyword = reqLink.params['s'];
                responseObj = { status: "success", s: keyword, result: [] };

                db.browsingHistory.find({ url: { $regex: keyword, $options: "i" } }).sort({frequency: -1}).limit(20).then((rows) => {
                    for (const i in rows) {
                        const el = rows[i];

                        responseObj.result.push({
                            url: el.url,
                            frequency: el.frequency,
                            lastUpdated: el.lastUpdated
                        })
                    }
                    sendResponse();
                })

                console.log(`A new search: ${keyword}.`)
                break;

            default:
                break;
        }
    })
}

module.exports = { setup };
