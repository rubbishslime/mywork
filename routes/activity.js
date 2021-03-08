var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/', function (req, res, next) {
    db.query(`SELECT * FROM activity order by date desc`, [], function (results, rows) {
        res.send(results)
    })
});
router.get('/show', function (req, res, next) {
    let name = req.query.name
    db.query("SELECT * FROM activity where name= '"+name+"'", [], function (results, rows) {
        res.send(results)
    })
});
router.get('/send', function(req, response, next) {
    let title = req.query.title
    let content = req.query.content
    let name = req.query.name
    let date = req.query.date
    let message = [title,content,name,date]
    console.log(message)
    let addsql= "insert into activity ( title, content, name, date) values (?,?,?,?)"
    db.query(addsql,message,function (err,res,fields){
        response.send({statusCode:200, msg:'成功'})
        return
    })
});
router.get('/delete',function (req,response,next){
    let id = req.query.id
    db.query("delete from activity where id= '"+id+"'",function (err,res,fields) {
            response.send({statusCode:200, msg:'成功'})
            return
        }
    )
});
module.exports = router;