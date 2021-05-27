const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

router.post('/subscribe',authenticate, async(req,res) => {
    try {
        // console.log(req.body);
        const SUBSCRIBE = `INSERT INTO SUBSCRIPTIONS (userid) VALUES ('${req.user.id}');`
        mysql.query(SUBSCRIBE, (err) => {
          if(err) {
            // console.log(err);
            res.status(501).json({error: "Login issue"});
          }
          res.status(200).json({status: "Subscription Successful"});
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})

module.exports = router;