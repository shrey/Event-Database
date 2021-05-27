const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

router.post('/rate',authenticate, async(req,res) => {
    try {
        // console.log(req.body);
        const RATE = `INSERT INTO rating (userid, eventid, points) VALUES ('${req.user.id}', '${req.body.eventid}', '${req.body.points}');`
        mysql.query(RATE, (err) => {
          if(err) {
            // console.log(err);
            res.status(501).json({error: "Login issue"});
          }
          res.status(200).json({status: "Rating Recorded"});
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})

module.exports = router;