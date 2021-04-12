const secrets = require('./secrets')

const server = {
    protocol: "http",
    host: "localhost",
    port: 4000
};

module.exports = {
    server: server,
    database: {
        url: `mongodb+srv://${secrets.database.username}:${secrets.database.password}@cluster0.m99wr.mongodb.net/todo?retryWrites=true&w=majority`,
        options: { useNewUrlParser: true, useUnifiedTopology: true, promiseLibrary: Promise }
    },
    oauth: {
        defaults: {
            origin: `${server.protocol}://${server.host}:${server.port}`,
            transport: "session",
            "state": true
        },
        google: {
            key: secrets.google.key,
            secret: secrets.google.secret,
            scope: ["openid"],
            callback: "/hello",
            nonce: true,
            response: ["tokens", "raw", "jwt", "profile"]
        }
    }
}