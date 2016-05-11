// /*************************************************************

// You should implement your request handler function in this file.

// requestHandler is already getting passed to http.createServer()
// in basic-server.js, but it won't work as is.

// You'll have to figure out a way to export this function from
// this file and include it in basic-server.js so that it actually works.

// *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

// **************************************************************/

var q = require('querystring');
var id = require('mongodb').ObjectID;
var path = require('path');
var URL = require('url');
var fs = require('fs');

//var body = {results: [] }; //set body equal to old messages object, --> pull that data out

var requestHandler = function(request, response) {
  var method = request.method;
  var parsedURL = URL.parse(request.url);

  if (request.url === '/') {
    var filename = __dirname + ('/public/index.html');
  } else {
    filename = __dirname + ('/public' + parsedURL.pathname);
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      response.writeHead(404, headers);
      response.end();
    }
    response.writeHead(200);
    response.end(data);
  });

  var headers = defaultCorsHeaders;
  
  headers['Content-Type'] = 'application/json';
  var statusCode = 200;

  if (parsedURL.pathname !== '/classes/messages' && parsedURL.pathname !== '/classes/room') {
    statusCode = 404;
  } else {
    var stringifiedBody = '';
    var body = JSON.parse(fs.readFileSync(__dirname + ('/public/messages.js'), 'utf-8')); //object with data

    if (method === 'POST') {
      statusCode = 201;
      request.on('data', (chunk) => {
        var fullString = '';
        fullString += chunk.toString(); 
        var parsed = JSON.parse(fullString); 
        parsed.objectId = id();
        body.results.unshift(parsed); 
      });
      request.on('end', () => { 
        response.writeHead(statusCode, headers);
        stringifiedBody = JSON.stringify(body);
        fs.writeFileSync(__dirname + ('/public/messages.js'), stringifiedBody, 'utf-8');
        response.end(stringifiedBody);
      });
    } 
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(body)); 
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
