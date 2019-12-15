let arguments = process.argv.splice(2);
let http = require('http');
let httpProxy = require('http-proxy');

//
// Addresses to use in the round robin proxy
//
let addresses = [
    { target: 'http://localhost:8886' },
    { target: 'http://localhost:8887' },
    { target: 'http://localhost:8888' }
];

let i = 0;
let proxy = httpProxy.createProxyServer({});

http.createServer((req, res) => {
    proxy.web(req, res, addresses[i]);
    i = (i + 1) % addresses.length;
}).listen(arguments[0] || 8080);