const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

router.post('/message',authenticate, async(req,res) => {
    try {
        console.log(req.body);
        const MESSAGE = `insert into messages (user1, user2,content) values('${req.user.id}','${req.body.userid}','${req.body.content}');`
        mysql.query(MESSAGE, (err) => {
          if(err) {
            console.log(err);
            res.status(501).json({error: "Login issue"});
          }
          res.status(200).json({status: "Message Sent"});
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})

router.get('/inbox',authenticate, async(req,res) => {
    try {
        // console.log(req.body);
        const INBOX = `select user.name,messages.content from user inner join messages on messages.user2 = '${req.user.id}' and messages.user1 = user.id;`
        mysql.query(INBOX, (err,result) => {
          if(err) {
            console.log(err);
            res.status(501).json({error: "Login issue"});
          }
          res.status(200).json(result);
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})

module.exports = router;