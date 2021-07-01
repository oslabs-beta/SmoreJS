const db = require('../models/UserModel');
const bcrypt = require('bcryptjs')

const userController: any = {};

// // The cost factor determines how much time is needed to calculate a single bcrypt hash
const saltRounds = 10;

// Middleware to encrypt passwords using bcrypt
userController.bcrypt = (req: any, res: any, next: any) => {
  // Destructure password from request body
  const { password } = req.body;
  // Generate the salt by passing in saltRounds (cost factor)
  bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
    // Hash a password by passing in the plaintext into the hash function
    bcrypt.hash(password, salt, (err: any, hash: any) => {
    // Save encrypted password into res.locals to be accessed later
    res.locals.bcrypt = hash;
    return next();
    })
  });
}

// Middleware to create new user when Users are signing up
userController.signup = (req: any, res: any, next: any) => {
  const { username } = req.body;
  // getting hashed password from bcrypt
  const password = res.locals.bcrypt;
  const query =  'INSERT INTO smore.users (username, password) VALUES ($1, $2);'
  const parameters = [username, password];
  db.query(query, parameters)
    .then((data: any) => {
      res.locals.userInfo = username;
      res.locals.signup = true;
      return next();
      }).catch((err: any) => next({'err in signup':err}));
}

// Middleware to verify user when Users are loginning in
userController.login = (req: any, res: any, next: any) => {
  const { username, password } = req.body;
  const query = 'SELECT password FROM smore.users WHERE username = $1';
  const parameters = [username]

  db.query(query, parameters)
    .then((data: any)=> {
      console.log(data)
      bcrypt.compare(password, data.rows[0].password, (err: any, result: any) => {
        if(err){
          return next({'login error': err});
        }
        if (result){
          res.locals.user = username;
          res.locals.login = true;
          return next();
        } else {
          res.locals.login = false;
          return next();
        }
      })
    })
}

// Querying userId
userController.getID = (req: any, res: any, next: any) => {
  const { username } = req.body;
  const query = 'SELECT _id FROM smore.users WHERE username = $1';
  const parameters = [username];

  db.query(query, parameters)
    .then((data: any) => {
      console.log(data.rows[0]._id)
      res.locals.id = data.rows[0]._id
      return next();
    })
    .catch((err: any) => next({'err in getID': err}));
}

// Saving logs to database
userController.saveLog = (req: any, res: any, next: any) => {
  const { logName, log, time } = req.body
  const id = res.locals.id;
  const timeLog = { log: log, time: time }
  const query =  'INSERT INTO smore.logs (user_id, "dataName", data) VALUES ($1, $2, $3)';
  const parameters = [id, logName, timeLog];

  db.query(query, parameters)
    .then((data: any) => {
      return next();
    })
    .catch((err: any) => next({'err in saveLog': err}))
};

// Middleware to query all previous logs
userController.getLog = (req: any, res: any, next: any) => {
  const id = res.locals.id;
  const query = 'SELECT "dataName", data FROM smore.logs WHERE user_id = $1';
  const parameters = [id];
  
  db.query(query, parameters)
    .then((data: any) => {
      res.locals.logs = data.rows;
      return next();
    })
    .catch((err: any) => next({'err in saveLog': err}))

}

module.exports = userController;
