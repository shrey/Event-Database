const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401);
    next();
  }
  jwt.verify(token, 'eventman', (err, user) => {
    if (err) {
      res.status(401);
    }
    req.user = user;
    next();
  });
};

module.exports = userAuth;