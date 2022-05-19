const  bcrypt = require("bcrypt")
const User = require("../models/users")
const jwt = require("jsonwebtoken")

exports.create = async (req, res, next )  => {

  const userExist = await User.findOne({username: req.body.username})

  if (userExist) {
    res.send(409).send("User already exists")
  }

  let encryptedPassword = await bcrypt.hash(req.body.password, 10)

  let user = new User({
    name: req.body.name, 
    lastname: req.body.lastname,
    username: req.body.username,
    identification: req.body.identification,
    active: req.body.active,
    password: encryptedPassword
  })

  user.save(err => {
    if (err){
      return next(err)
    }

    res.send("User registered successfully")
  })
}

exports.login = async (req, res, next )  => {
  const{ username, password } = req.body

  if (!username || !password){
    res.status(400).send("Username and password are required")
  }

  const user = await User.findOne({username})

  if (user && bcrypt.compare(password, user.password)) {
    const token = jwt.sign({user_id: user._id, username},  process.env.TOKENSECRET+"", {expiresIn: "2h" })
    user.token = token
    user.password = null

    res.status(200).send(user)
    console.log()
  }else{
    res.status(400).send("Invalid Credentials")
  }

}

exports.index = (req, res, next) => {
  User.find({}, (err, users)=>{
      if (err)
          return next(err) 
      res.send(users)
  } )
}


