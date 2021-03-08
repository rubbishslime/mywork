var express = require('express');
var router = express.Router();

var db = require("./db");
/* GET users listing. */
router.get('/', function (req, res, next) {
    let corporation = req.query.corporation
      db.query("SELECT * FROM users where corporation='"+corporation+"' and job != '管理员' ", [], function (results, rows) {
        res.send(results)
      })
});
router.get('/select', function (req, res, next) {
    let corporation = req.query.corporation
      db.query("SELECT * FROM users", [], function (results, rows) {
        res.send(results)
      })
});
router.get('/update',[],function (req, res, next) {
    let name = req.query.name
    let corporation = req.query.corporation
    let gender = req.query.gender
    let age = req.query.age
    let id = req.query.id
    let job = req.query.job
    let phone = req.query.phone
    let grade = req.query.grade
    let password = req.query.password
    db.query("update users set username='"+name+"' ,gender='"+gender+"',age='"+age+"',password='"+password+"',phone='"+phone+"',grade='"+grade+"',job='"+job+"',corporation='"+corporation+  "'where id= '"+id+"'", function (results, rows) {
        res.send({statusCode:200, msg:'成功'})
        }
    )}
);
router.get('/set',[],function (req, res, next) {
    let job = req.query.job
    let id = req.query.id
    db.query("update users set job='"+job+  "'where id= '"+id+"'", function (results, rows) {
            res.send({statusCode:200, msg:'成功'})
        }
    )}
);
router.get('/deleteUsers',[],function (req, res, next) {
    let id = req.query.id
    db.query("delete from users where id='"+id+"'", function (results, rows) {
            res.send({statusCode:200, msg:'成功'})
        }
    )}
);
router.get('/delete',[],function (req, res, next) {
    let id = req.query.id
    db.query("update users set corporation= null where id= '"+id+"'", function (results, rows) {
            res.send('succeed')
        }
    )}
);
module.exports = router;
