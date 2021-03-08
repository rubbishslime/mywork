var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/', function (req, res, next) {
    db.query(`SELECT * FROM corporation`, [], function (results, rows) {
        res.send(results)
    })
});
router.get('/select', function (req, res, next) {
    let userid = req.query.userid
    let corporation  = req.query.corporation
    db.query("SELECT * FROM examine where userid='"+userid+"'and corporation='"+corporation+"'", [], function (results, rows) {
        res.send(results)
    })
});
router.get('/exit', function (req, res, next) {
    let userid = req.query.userid
    db.query("update users set corporation= null where id='"+userid+"'" , [], function (results, rows) {
        res.send(results)
    })
});
router.get('/post', function (req, res, next) {
    let username  = req.query.username
    let userid  = req.query.userid
    let corporation  = req.query.corporation
    let grade = req.query.grade
    let age = req.query.age
    let gender = req.query.gender
    let phone = req.query.phone
    let content = [username,userid,corporation,grade,age,gender,phone]
    let addsql = "insert into examine (username,userid,corporation,grade,age,gender,phone) value(?,?,?,?,?,?,?)"
    db.query(addsql, content,function (results, rows) {
        res.send('成功')
    })
});
module.exports = router;