const http = require('http');

const CONFIG = require('./config.js')
const httpServer = require('./http/httpServer.js')

var server = http.createServer();
const mongoose = require('mongoose');

mongoose.connect(CONFIG.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`MongoDB connected with ${CONFIG.MONGODB_URI}`);

    httpServer.setup(server);
    server.listen(CONFIG.PORT, () => {
        console.log(`Server listening at port ${CONFIG.PORT}`);
    })
})
