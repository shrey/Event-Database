const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

router.post('/add',authenticate, async(req,res) => {
    try {
        // console.log(req.body);
        const CREATE_COMMENT = `INSERT INTO friends (user1,user2) VALUES ('${req.user.id}', '${req.body.id}')`
        mysql.query(CREATE_COMMENT, (err) => {
          if(err) {
            // console.log(err);
            res.status(501).json({error: "Login issue"});
          }
          res.status(200).json({status: "Friend Added successfully"});
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})

router.get('/my',authenticate, async(req,res) => {
    try {
        console.log(req.user);
        const GET_FRIENDS = `select user.name from user inner join friends on friends.user1 = "${req.user.id}" and friends.user2 = user.id`

        mysql.query(GET_FRIENDS, (err,result) => {
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