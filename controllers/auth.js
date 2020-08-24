const _ = require("lodash");
const User = require("../models/User");


exports.signUp = (req, res) => {
  const { name, email, dob, password, profession } = req.body;
  
  const userNew = new User();

  

  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }

    if (user) {
      return res.status(400).json({
        error: "Email already exists!!",
      });
    }
    userNew.name = name;
    userNew.email = email;
    userNew.dob = dob;
    userNew.password = password;
    userNew.profession = profession;

    userNew.save((err,user) => {
              if(err){
                  return res.status(400).json({
                      status: "failed",
                      message: "failed to create a post",
                  })
              }
              return res.json({
                data: user,
                message: "Succesfully signed up"
              });
          });
     
  });

}


exports.signIn = (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  // console.log(req.body);
  // AuthLogger.setLogData(req.body);
  // AuthLogger.info("Request recieved at auth/signin", req.body);

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
     

      return res.status(400).json({
        error: "User with the email specified doesn't exist.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Password is incorrect",
      });
    }
    const { _id, name, email } = user;

    return res.json({
      user: {
        _id,
        name,
        email
      },
      isLoggedIn: true,
      message: "Signed in successfully",
    });
  });
};

