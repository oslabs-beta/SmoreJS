const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// handle endpoint for sign up
router.post('/signup',
  userController.bcrypt,
  userController.signup,
  (req: any, res: any) => {
    res.send({ 'signed up': res.locals.signup, user: res.locals.userInfo })
  }
);

// handle endpoint for login
router.post('/login',
  userController.login,
  (req: any, res: any) => {
    res.send({ 'logged in': res.locals.login, user: res.locals.user })
  }
);

//handle endpoint for saving logs
router.post('/saveLog',
  userController.getID,
  userController.saveLog,
  (req: any, res: any) => {
    res.json('sent');
  }
);

//handle endpoint for getting logs
router.post('/getLog',
  userController.getID,
  userController.getLog,
  (req: any, res: any) => {
    res.json(res.locals.logs);
  }
);

module.exports = router;
