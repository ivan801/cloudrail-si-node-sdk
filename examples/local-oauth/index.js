const http = require("http");
const opn = require('opn');
const services = require("cloudrail-si").services;

const port = 12345;

// This implementation of redirectReceiver opens a server on localhost and then uses the local browser to present the authentication and redirect to localhost
let redirectReceiver = (url, state, callback) => {
    let server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.end("<h1>This window can be closed</h1>");
        server.close(); // This won't immediately close the server, just prevent it from taking new connections
        callback(req.url);
    });
    server.listen(port);

    opn(url);
};

// The Instagram application with the given client ID and secret (replace "xxx") must have the redirect URI "http://localhost:12345/auth" registered
let profile = new services.Instagram(redirectReceiver, "xxx", "xxx", "http://localhost:" + port + "/auth", "state");

profile.getFullName((err, fullName) => {
    if (err) console.log(err);
    else console.log("User's full name is " + fullName);
});