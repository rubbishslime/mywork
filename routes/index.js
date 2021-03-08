var express = require('express');
var router = express.Router();
var db = require("./db");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express:a' });
});

router.get('/select',function (req, res, next) {
  db.query(`SELECT name FROM corporation`, '', function (results, rows) {
        res.send(results)
      }
    )}
);
router.get('/corporation',[],function (req, res, next) {
    let corporationName = req.query.name
    db.query("SELECT * FROM corporation where name='"+corporationName+"'", '', function (results, rows) {
            res.send(results)
        }
    )}
);
router.get('/examine',[],function (req, res, next) {
    let corporation = req.query.corporation
    db.query("SELECT * FROM examine where corporation='"+corporation+"'", '', function (results, rows) {
            res.send(results)
        }
    )}
);
router.get('/examine/adopt',[],function (req, res, next) {
    let userid = req.query.userid
        let corporation = req.query.corporation
    db.query("delete from examine where userid='"+userid+"'", '', function (results, rows) {
            res.send(results)
        }
    )
        db.query("update users set corporation='"+corporation+"' where id='"+userid+"'", '', function (results, rows) {
            }
        )
}
);
router.get('/examine/refuse',[],function (req, res, next) {
    let userid = req.query.userid
    let corporation = req.query.corporation
    db.query("delete from examine where userid='"+userid+"'and corporation='"+corporation+"'", '', function (results, rows) {
            res.send(results)
        }
    )}
);
router.get('/message',[],function (req, res, next) {
    let corporation = req.query.corporation
    db.query("SELECT * FROM message where corporation='"+corporation+"'", '', function (results, rows) {
            res.send(results)
        }
    )}
);
router.get('/message/send',[],function (req, res, next) {
    let corporation = req.query.corporation
    let content = req.query.content
    let name = req.query.name
    let date = req.query.date
    let message = [corporation,content,name,date]
    let addsql= "insert into message ( corporation, content, name, date) values (?,?,?,?)"
    db.query(addsql,message,function (results, rows){
        res.send({statusCode:200, msg:'成功'})
        return
    });
    }
);
router.get('/corporation/send',[],function (req, res, next) {
    let president = req.query.president
    let introduce = req.query.introduce
    let name = req.query.name
    let message = [president,introduce,name]
    let addsql= "insert into corporation ( president, introduce, name) values (?,?,?)"
    db.query(addsql,message,function (results, rows){
        res.send({statusCode:200, msg:'成功'})
        return
    });
    }
);
router.get('/cut',function (req,response,next){
    let id = req.query.id
    db.query("delete from corporation where id= '"+id+"'",function (err,res,fields) {
            response.send({statusCode:200, msg:'成功'})
            return
        }
    )
});
router.get('/setinfo',[],function (req, res, next) {
    let name = req.query.name
    let gender = req.query.gender
    let age = req.query.age
    let id = req.query.id
    let phone = req.query.phone
    let grade = req.query.grade
    let password = req.query.password
    db.query("update users set username='"+name+"' ,gender='"+gender+"',age='"+age+"',password='"+password+"',phone='"+phone+ "' ,grade='"+grade+"'where id= '"+id+"'", function (results, rows) {
            res.send({statusCode:200, msg:'成功'})
        }
    )}
);
router.get('/introduce',[],function (req, res, next) {
    let name = req.query.name;
    let introduce = req.query.introduce;
  db.query("update corporation set introduce= '"+introduce+"' where name= '"+name+"'", function (results, rows) {
        res.send('succeed')
      }
    )}
)
module.exports = router;
