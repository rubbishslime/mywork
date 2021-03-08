var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/', function(req, response, next) {
    // 把从客户端传来的名字，密码赋值到新的变量
    let name = req.query.username
    let pwd = req.query.password
    // 通过名字查询数据库用户表得到密码  password是数据表字段名，表名user_info
    db.query("SELECT password FROM users WHERE username = '"+name+"'",function (err,res,fields) {
        console.log(req.query)
        // 当没有查找到密码时
        if(err) {
            throw err
            return
        }else{
            if(res.length > 0){
                //将数据库传来的数据转化为JSON格式
                let uPasswordString = JSON.stringify(res);
                let userPassword = JSON.parse(uPasswordString)[0].password;
                if(userPassword === pwd){
                    //将数据库的密码userPassword 和服务端 传来的密码相等
                    db.query("select * from users where username = '"+name+"'",function (err,res,fields) {
                        response.send({statusCode:200, msg:'登录成功',data: res})
                    })
                    console.log('success')
                    return
                }else{
                    response.send({ statusCode:0, msg:'密码不正确'})
                    return
                }
            }
        }
        //如果没有数据，说明用户名填写错误
        response.send({ statusCode:0, msg:'用户名不正确'})
    })});
router.get('/register',function(req, response) {
    let rname = req.query.username
    let rpwd = req.query.password
    let content = [rname,rpwd]
    let addsql= "insert into users ( username, password) values (?,?)"
    let selectsql= "select * from users where username= '"+rname+"'"
    db.query(selectsql,function (err,res,fields){
        if(res.length < 1) {
            if(req.query.password.length < 6) {
                response.send({statusCode:201, msg:'密码不能低于6位'})
                return
            }else{
            response.send({statusCode:200, msg:'该用户名可用'})
            db.query(addsql,content)
            return
            }
        }else {
            response.send({ststusCode:0,msg:'该用户名已存在'})
            console.log(res)
            return
        }
        }
    )
});
module.exports = router;