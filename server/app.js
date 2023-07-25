const http = require('http');
let userList = require('./json/user.json')
let roleList = require('./json/role.json')
http.createServer((request, response) => {
  response.setHeader('access-control-allow-origin', '*');
  response.setHeader('Content-Type', 'text/html;charset=utf-8');
  response.statusCode = 200;
  let r = {
    code: 200,
    data: null,
    msg: "请求成功"
  }
  if (request.url === '/') {
    r = "vue2-pbstar-admin server"
  } else if (request.url === '/getUserList') {
    r.data = userList
  } else if (request.url === '/getRoleList') {
    r.data = roleList
  } else if (request.url === '/toLogin') {
    r.data = roleList
  } else {
    response.statusCode = 404;
    r = "404 not found this api"
  }
  response.end(JSON.stringify(r));
}).listen(6083, () => {
  console.log("服务器开启成功：http://localhost:6083")
});