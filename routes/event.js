const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

// const randomString = () => {
//     return Math.random().toString(36).slice(2);
// }

router.post('/create', authenticate, async (req, res) => {
    try {
      const CREATE_EVENT = `INSERT INTO events (eventname, description, userid) VALUES ('${req.body.name}', '${req.body.description}', '${req.user.id}')`
      mysql.query(CREATE_EVENT, (err) => {
        console.log(err);
        if(err) {
          res.status(501).json({error: "Login issue"});
        }
        res.status(200).json({status: "event created"});
      })
    } catch (err) {
      res.status(501).json({error: "Login issue"});
    }
})

router.get('/all', async(req,res) => {
    const SELECT_ALL = `SELECT id, eventname FROM EVENTS`;
    mysql.query(SELECT_ALL, (err, result) => {
        if(err) {
          res.status(501).json(err);
        }
        console.log(result);
        res.status(200).json({result});
      })
})

// to get all events created by logged in user

router.get('/my', authenticate, async (req, res) => {
    try {
    // console.log("here");
    // console.log(req.user.id);
      const FIND_EVENT = `SELECT id, eventname from events where userid = '${req.user.id}';`
      mysql.query(FIND_EVENT, (err, result) => {
        if(err) {
          res.status(501).json({error: "Login issue"});
        }
        // console.log(result);
        else res.status(200).json({result});
      })
    } catch (err) {
      res.status(501).json({error: "Login issue"});
    }
})

router.post('/comments', async(req,res) => {
    const FETCH_COMMENTS = `select * from comments where eventid = ${req.body.eventid}`;
    mysql.query(FETCH_COMMENTS, (err,result) => {
        if(err) {
            console.log(err);
            res.status(501).json({error: "ISSUE IN FETCHING COMMENTS"});
        }
        else{
            res.status(200).json({result});
        }
    })
})

module.exports = router;

//also make search event blog