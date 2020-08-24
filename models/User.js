const mongoose = require("mongoose");
const crypto = require("crypto");  // for salting(no developer can know password of user) - helps in cryptography

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true ,                //removes spaces from beginning and end
            required: true,
            max: 32
          },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
          },
        hashed_password: {
            type: String,
            required: true,
          },
          dob:{
            type: Date,
            required: true,
        },
        profession:{
            type: String,
            trim: true,
            default: "subscriber",
        },
        
        salt: {
            type: String,
            required: true,
          },
        
  
    }, 
     { timestamps: true }
    );
    
UserSchema.methods = {
        makeSalt: function () {
          return Math.round(new Date().valueOf() * Math.random() + "");
        },
      
        encryptPassword: function (password) {
          if (!password) return "";
      
          try {
            return crypto
              .createHmac("sha1", this.salt)
              .update(password)
              .digest("hex");
          } catch (err) {

            
            return err;
          }
        },
      
        authenticate: function (password) {
          return this.encryptPassword(password) === this.hashed_password;
        },
      };
      
      UserSchema.virtual("password")
        .set(function (password) {
          // temporary variable called password
          this._password = password;
      
          // generate salt and save it in our database
          this.salt = this.makeSalt();
      
          // encrypt the password
          this.hashed_password = this.encryptPassword(password);
        })
        .get(function () {
          return this._password;
        });

        
module.exports = mongoose.model("user", UserSchema);