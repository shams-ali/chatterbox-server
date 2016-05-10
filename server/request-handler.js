// /*************************************************************

// You should implement your request handler function in this file.

// requestHandler is already getting passed to http.createServer()
// in basic-server.js, but it won't work as is.

// You'll have to figure out a way to export this function from
// this file and include it in basic-server.js so that it actually works.

// *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

// **************************************************************/

var q = require('querystring');
var utils = require('util');

var body = {results: [] };

var requestHandler = function(request, response) {
  var method = request.method;
  var url = request.url;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  console.log('Serving request type ' + method + ' for url ' + url);

  // The outgoing status.
  var statusCode = 200;

  if (request.method === 'POST') {
    statusCode = 201;
  } else if (request.url !== '/classes/messages') {
    statusCode = 404;
  }

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);
  
  if (request.method === 'GET') {
    console.log(statusCode, 'status');
    response.end(JSON.stringify(body));  
  } else if (request.method === 'POST') {
    var full = '';

    request.on('data', (chunk) => {
      full += chunk.toString();
      body.results.push(JSON.parse(full));
    });
    request.on('end', () => {
      response.end(JSON.stringify(body));
    });
  } 



};

exports.requestHandler = requestHandler;

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/




