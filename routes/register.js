const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

router.post('/new',authenticate, async(req,res) => {
    try {
        const FIND = `SELECT * FROM register where userid = '${req.user.id}' and eventid = ${req.body.eventid}`;
        mysql.query(FIND,(err,result) => {
            // console.log(result);
            // console.log(err);
            if(result.length != 0){
                res.status(200).json({error: "User already registered for the event"});
            }else{
                const REGISTER = `INSERT INTO register (userid, eventid) VALUES ('${req.user.id}', ${req.body.eventid})`
                mysql.query(REGISTER, (err) => {
                  if(err) {
                    // console.log(err);
                    // console.log("here");
                    res.status(501).json({error: "Login issue"});
                  }
                  else{
                      res.status(200).json({status: "User registered"});
                  }
                })
            }
        })
      } catch (err) {
        res.status(501).json({error: "Login issue"});
      }
})

router.get('/all', async(req,res) => {
    try{
        const GET_ALL = `select register.id, user.name, events.eventname from ((register inner join user on user.id = register.userid) inner join events on events.id = register.eventid);`
        mysql.query(GET_ALL, (err,result) => {
            if(err){
                res.status(501).json({error: "Database error"});
            }else{
                res.status(200).json(result);
            }
        })
    } catch(err) {
        res.status(501).json({err});
    }
})



module.exports = router;