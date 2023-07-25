const http = require('http');

var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

let userList = require('./json/user.json')
let roleList = require('./json/role.json')
http.createServer((request, response) => {
  response.setHeader('access-control-allow-origin', '*');
  response.setHeader('Content-Type', 'text/html;charset=utf-8');
  response.statusCode = 200;
  let data = ''
  request.on('data', function (chunk) {
    data += chunk;
  });
  request.on('end', function () {
    data = querystring.parse(decodeURI(data));
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
    } else if (request.url === '/toAuthority') {
      for (let i = 0; i < roleList.length; i++) {
        if (roleList[i].id == data.id) {
          roleList[i].authority = data.authority
        }
      }
      changeFile('role.json', roleList)
    } else {
      response.statusCode = 404;
      r = "404 not found this api"
    }
    response.end(JSON.stringify(r));
  });
}).listen(6083, () => {
  console.log("服务器开启成功：http://localhost:6083")
});

function changeFile(filename, text) {
  const fullWriteFilePath = path.resolve(__dirname, './', 'json', filename)
  const writeStream = fs.createWriteStream(fullWriteFilePath, {
    flags: 'w'
  })
  writeStream.write(JSON.stringify(text))
}