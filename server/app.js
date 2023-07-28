const http = require('http');
const qs = require('qs')
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
    data = qs.parse(querystring.parse(decodeURI(data)));
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
      r = toLogin(data, r)
    } else if (request.url === '/toAuthority') {
      r = toAuthority(data, r)
    } else if (request.url === '/toRole') {
      r = toRole(data, r)
    } else if (request.url === '/toUserActive') {
      r = toUserActive(data, r)
    } else if (request.url === '/toUser') {
      r = toUser(data, r)
    } else {
      response.statusCode = 404;
      r = "404 not found this api"
    }
    response.end(JSON.stringify(r));
  });
}).listen(6083, () => {
  console.log('服务器开启成功：' + '\x1B[36mhttp://localhost:6083\x1B[0m')
});

function changeFile(filename, text) {
  const fullWriteFilePath = path.resolve(__dirname, './', 'json', filename)
  const writeStream = fs.createWriteStream(fullWriteFilePath, {
    flags: 'w'
  })
  writeStream.write(JSON.stringify(text))
}
function toLogin(data, r) {
  let info = ''
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].account == data.account) {
      info = userList[i]
    }
  }
  if (info == '' || info.isDelete == 1) {
    r.code = 101
    r.msg = '没有找到用户信息'
    return r
  }
  if (info.password != data.password) {
    r.code = 102
    r.msg = '密码错误'
    return r
  }
  if (info.isActive == 1) {
    r.code = 102
    r.msg = '您的帐号已被禁用'
    return r
  }
  for (let i = 0; i < roleList.length; i++) {
    if (roleList[i].id == info.role) {
      info.authority = roleList[i].authority
    }
  }
  r.data = info
  return r
}
function toAuthority(data, r) {
  for (let i = 0; i < roleList.length; i++) {
    if (roleList[i].id == data.id) {
      roleList[i].authority = data.authority
    }
  }
  changeFile('role.json', roleList)
  return r
}
function toRole(data, r) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].account == data.account) {
      userList[i].role = Number(data.role)
    }
  }
  changeFile('user.json', userList)
  return r
}
function toUserActive(data, r) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].account == data.account) {
      userList[i].isActive = Number(data.isActive)
    }
  }
  changeFile('user.json', userList)
  return r
}
function toUser(data, r) {
  if (data.isEdit == 'true') {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].account == data.info.account) {
        userList[i] = data.info
      }
    }
  } else {
    userList.push(data.info)
  }
  changeFile('user.json', userList)
  return r
}