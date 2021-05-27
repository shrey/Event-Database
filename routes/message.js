const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

router.post('/message',authenticate, async(req,res) => {
    try {
        // console.log(req.body);
        const MESSAGE = `insert into messages (user1, user2,content) values('${req.user.id}','${req.body.userid}',"Hey");`
        mysql.query(MESSAGE, (err) => {
          if(err) {
            // console.log(err);
            res.status(501).json({error: "Login issue"});
          }
          res.status(200).json({status: "Message Sent"});
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})

router.GET('/inbox',authenticate, async(req,res) => {
    try {
        // console.log(req.body);
        const INBOX = `select user.name from user inner join friends on friends.user2 = '${req.user.id}' and friends.user1 = user.id;`
        mysql.query(INBOX, (err,result) => {
          if(err) {
            // console.log(err);
            res.status(501).json({error: "Login issue"});
          }
          res.status(200).json(result);
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})

module.exports = router;