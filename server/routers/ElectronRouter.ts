const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// handle endpoint for sign up
router.post('/signup',
  userController.bcrypt,
  userController.signup,
  (req: any, res: any) => {
    res.send({ "signed up": res.locals.signup })
  }
);

// handle endpoint for login
router.post('/login',
  userController.login,
  (req: any, res: any) => {
    res.send({ "logged in": res.locals.login, "user": res.locals.user })
  }
);





module.exports = router;