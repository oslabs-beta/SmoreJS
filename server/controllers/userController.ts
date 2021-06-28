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

userController.signup = (req: any, res: any, next: any) => {
    const { username } = req.body;
    const password = res.locals.bcrypt;
    console.log(password);
    const query =  'INSERT INTO smore.users (username, password) VALUES ($1, $2);'
    const parameters = [username, password];

    db.query(query, parameters)
        .then((data: any) => {
            console.log(data);
            res.locals.userInfo = data;
            res.locals.signup = true;
            return next();
        }).catch((err: any) => next(err));
}

userController.login = (req: any, res: any, next: any) => {
    const { username, password } = req.body;
    const query = 'SELECT password FROM smore.users WHERE username = $1'
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

module.exports = userController;