const http = require('http');
let userList = require('./json/user.json')
http.createServer((request, response) => {
  response.setHeader('access-control-allow-origin', '*');
  response.statusCode = 200;
  let r = {
    code: 200,
    data: null
  }
  if (request.url === '/') {
    r.data = userList
  } else if (request.url === '/shopping') {
    r.data = userList
  } else if (request.url === '/list') {
    r.data = userList
  } else {
    response.statusCode = 404;
    r = null
  }
  response.end(JSON.stringify(r));
}).listen(6083, () => {
  console.log('服务器开启成功' + location.href);
});