var express = require('express');
var router = express.Router();
var db = require("./db");
router.get('/', function (req, res, next) {
    db.query(`SELECT * FROM info order by date desc`, [], function (results, rows) {
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
    let addsql= "insert into info ( title, content, name, date) values (?,?,?,?)"
    db.query(addsql,message,function (err,res,fields){
        response.send({statusCode:200, msg:'成功'})
        return
    })
});
module.exports = router;