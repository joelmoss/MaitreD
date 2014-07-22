var authenticate = require('./authenticate'),
    fs = require('fs'),
    request = require('request'),
    httpProxy = require('http-proxy');


var options = {
  port: 5000,
  user: 'maitre_d',
  key: fs.readFileSync('./client.pem'),
  domain: 'api.opscode.com',
  https: true
};


function headers(method, uri, body) {
  method = method.toUpperCase();
  if (typeof body === 'undefined') body = undefined;

  var auth = authenticate({
    key: options.key,
    user: options.user
  }, {
    body: body,
    method: method,
    uri: uri
  });

  var host = options.domain;
  if (options.https) host += ':443';

  var _headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Host': host
  };

  for (var key in auth) {
    _headers[key] = auth[key];
  };

  return _headers;
}

var proxy = httpProxy.createProxyServer({});
var server = require('http').createServer(function(req, res) {
  console.log('* ' + new Date() + ' - Proxying ' + req.method + ' ' + req.url);

  proxy.web(req, res, {
    target: (options.https ? 'https://' : 'https://') + options.domain,
    headers: headers(req.method, req.url, req.body),
    secure: true
  });
});

console.log('Chef Proxy listening on port ' + options.port);
server.listen(options.port);
