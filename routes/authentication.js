const router = require('express').Router();
const authController = require('../controller/authentication');
const jwt = require('jsonwebtoken');

const mySqlConnection = require('../utils/db')
const mysql = mySqlConnection()
const bcyrpt = require('bcryptjs')



router.post('/login', async (req, res) => {
    const FIND_USER = `SELECT * FROM user WHERE email = "${req.body.email}"`
    mysql.query(FIND_USER, (err, user) => {
    // console.log(user[0].password, err)
    if (err) {
      res.status(400).json({
        message: 'Login failed'
      })
    }
    if (bcyrpt.compareSync(req.body.password, user[0].password)) {
      var token = jwt.sign({
        id: user[0].id, email: user[0].email, name: user[0].name
      }, 'eventman', { expiresIn: '7d' })

      return res.status(200).json({
        message: 'Logged In',
        token: `Insert the following token in the Bearer token: ${token}`
      })
    } else {
      res.status(400).json({
        message: 'Login failed'
      })
    }
  })
  }
)
router.post('/register', async(req,res) => {
    try{
        await authController.registerController(req.body);
        res.status(200).json({status : 'User Registered Sucessfully'});
    }
    catch (error) {
        res.status(400).json({status: 'Error occured', error: error});
    }
})

module.exports = router;