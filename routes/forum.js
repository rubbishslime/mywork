var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/', function (req, res, next) {
    db.query(`SELECT * FROM forum order by date desc`, '', function (results, rows) {
        res.send(results)
    })
});
router.get('/send', function(req, response, next) {
    let title = req.query.title
    let content = req.query.content
    let spokesman = req.query.spokesman
    let date = req.query.date
    let message = [title,content,spokesman,date]
    let addsql= "insert into forum ( title, content, spokesman, date) values (?,?,?,?)"
    db.query(addsql,message,function (err,res,fields){
        response.send({statusCode:200, msg:'成功'})
        return
    })
});
router.get('/delete',function (req,response,next){
    let id = req.query.id
    db.query("delete from forum where id= '"+id+"'",function (err,res,fields) {
            response.send({statusCode:200, msg:'成功'})
        return
        }
    )
});
module.exports = router;