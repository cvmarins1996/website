// criar o http server.
var http = require('http');

// responder as requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end("Site Online\n");
});
//require(index.html);
// Porta 8000
server.listen(8000);

// no console
console.log("Servidor  http://localhost:8000/");