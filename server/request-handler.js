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
  var statusCode = 200;

  console.log('Serving request type ' + method + ' for url ' + url);

  // The outgoing status.
  console.log(request.data, 'request');

  if (url.substr(0, 17) !== '/classes/messages' && url.substr(0, 13) !== '/classes/room') {
    statusCode = 404;
  } else {
    if (method === 'POST') {
      statusCode = 201;
      request.on('data', (chunk) => {
        var fullString = '';
        fullString += chunk.toString();
        body.results.unshift(JSON.parse(fullString));
        console.log(body, '$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      });
      request.on('end', () => { 
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(body));
      });
    }
  }

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(body));
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
