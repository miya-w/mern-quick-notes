const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
module.exports = {
    create,
     login,
    checkToken,

  };
  

  function checkToken(req, res){
    console.log('req.user', req.user);
    res.json(req.exp);
  }
  // controllers/api/users.js

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
        // token will be a string
    const token = createJWT(user);
    res.json(token)
    
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

  // function create(req, res) {
  //   // Baby step...
  //   res.json({
  //     user: {
  //       name: req.body.name,
  //       email: req.body.email
  //     }
  //   });
  // }
  async function login(req, res) {
    try {
      const user = await User.findOne({email: req.body.email});
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      const token = createJWT(user);
      res.json(token);
    } catch (err) {
      res.status(400).json('Bad Credentials');
    }
  }

  /*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}