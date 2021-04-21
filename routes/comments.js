const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

router.post('/comment',authenticate, async(req,res) => {
    try {
        // console.log(req.body);
        const CREATE_COMMENT = `INSERT INTO comments (content, userid, eventid) VALUES ('${req.body.content}', '${req.user.id}', ${req.body.eventid})`
        mysql.query(CREATE_COMMENT, (err) => {
          if(err) {
            // console.log(err);
            res.status(501).json({error: "Login issue"});
          }
          res.status(200).json({status: "Comment Posted"});
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})


module.exports = router;