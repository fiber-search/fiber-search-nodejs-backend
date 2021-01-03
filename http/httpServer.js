const CONFIG = require('../config.js')
const Link = require('../modules/link.js');
const Time = require('../modules/time.js');
const db = require('../db/models.js')

function setup(server) {
    server.on('request', (request, response) => {
        var responseObj = {};
        if (CONFIG.RESPONSE_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN) { response.setHeader("Access-Control-Allow-Origin", CONFIG.RESPONSE_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN) }
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
                        row.updateOne({ title: reqLink.params.title, frequency: row.frequency + 1, lastUpdated: time.accurateToDate() }).then(() => {
                            responseObj = { status: "success", firstTime: false };
                            sendResponse();
                        })
                    } else {
                        db.browsingHistory({ url: recordUrl, title: reqLink.params.title, frequency: 1, lastUpdated: time.accurateToDate() }).save().then(() => {
                            responseObj = { status: "success", firstTime: true };
                            sendResponse();
                        })
                    }
                })

                CONFIG.SHOW_RECORD_URL ? console.log(recordUrl) : console.log("A new record.");
                break;

            case "record-no-increasing":
                var recordUrl = new Link(reqLink.params.url).pure();
                db.browsingHistory.findOne({ url: recordUrl }).then((row) => {
                    if (row) {
                        var tmp = {};
                        for (const i in reqLink.params) {
                            if (i != "type" && i != "url") {
                                tmp[i] = reqLink.params[i];
                            }
                        }
                        row.updateOne(tmp).then(() => {
                            responseObj = { status: "success" };
                            sendResponse();
                            CONFIG.SHOW_RECORD_URL ? console.log(`${recordUrl} (no-increasing) : ${JSON.stringify(tmp)}`) : console.log("A new record.");
                        })
                    } else {
                        responseObj = { status: "failed", desc: "cannot find requested url in the database" }
                        sendResponse();
                    }
                })

                break;

            case "s":
                var keyword = reqLink.params['s'];
                responseObj = { status: "success", s: keyword, result: [] };

                db.browsingHistory.find({ url: { $regex: keyword, $options: "i" } }).sort({ frequency: -1 }).limit(20).then((rows) => {
                    for (const i in rows) {
                        const el = rows[i];

                        responseObj.result.push({
                            url: el.url,
                            title: el.title,
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
