const router = require('express').Router();
const authenticate = require('../utils/middleware');

const mySqlConnection = require('../utils/db');
const mysql = mySqlConnection();

const randomString = () => {
    return Math.random().toString(36).slice(2);
}

router.post('/create', authenticate, async (req, res) => {
    try {
      const CREATE_EVENT = `INSERT INTO events (name, description, userid, id) VALUES ('${req.body.name}', '${req.body.description}', '${req.user.id}', '${randomString()}')`
      mysql.query(CREATE_EVENT, (err) => {
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
    const SELECT_ALL = `SELECT id, name FROM EVENTS`;
    mysql.query(SELECT_ALL, (err, result) => {
        if(err) {
          res.status(501).json(err);
        }
        console.log(result);
        res.status(200).json({result});
      })
})

module.exports = router;

//also make search event blog