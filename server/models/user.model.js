const mongoose = require('mongoose')
const Team = require('./team.model');

const bcrypt = require('bcrypt') //encrypts and hashes our password
const {isEmail} = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be at least 2 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        lowercase: true,
        trim: true,
        validate: [isEmail, "Please enter a valid Email"]
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
      },
      team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
      }]
    
}, {timestamps: true})

//wont be saved within db but creates a virtual attribute to check if passwords match
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword) //getter
    .set(value => this._confirmPassword = value); //setter

//middleware to check if passwords matches confirm password
UserSchema.pre('validate', function(next){
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password')
    }
    next();
});

//middleware to hash password before saving to database
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model("User", UserSchema)
module.exports = User;