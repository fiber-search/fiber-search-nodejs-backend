const http = require('http');

const httpServer = require('./httpServer.js')
const db = require('./httpServer.js')

const ENV = {
    PORT: 48534,
    SHOW_RECORD_URL: true,
    MONGODB_URI: 'mongodb://localhost:27017/fiber-search',
}
httpServer.setENV(ENV);

var server = http.createServer();
const mongoose = require('mongoose');

mongoose.connect(ENV.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`MongoDB connected with ${ENV.MONGODB_URI}`);

    httpServer.setup(server);
    server.listen(ENV.PORT, () => {
        console.log(`Server listening at port ${ENV.PORT}`);
    })
})
