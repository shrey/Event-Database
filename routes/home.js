const router = require('express').Router();

const mySqlConnection = require('../utils/db')
const mysql = mySqlConnection()

router.get('/all', async(req,res) => {
    const qry = "SELECT * FROM USER";
    mysql.query(qry, (err,result) => {
        if(err){
            res.status(501).json(error);
        }
        console.log(result);
        res.status(200).json(result);
    })
})

router.post('/none', async(req,res) => {
    const qry = `INSERT INTO user (_id, firstname, lastname) VALUES ('${req.body.id}', '${req.body.firstname}', '${req.body.lastname}')`
    mysql.query(qry, (err) => {
        if(err) {
          res.status(501).json(err);
        }
        res.status(200).json({status : true});
      })
})
module.exports = router;
