const User = require("../models/user.model");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt")
const secret = process.env.SECRET_KEY;

//create new user
module.exports = {
    register: async (req, res) => {
        try {
            // Check if user already exists in the database
            const potentialUser = await User.findOne({ email: req.body.email });
            if (potentialUser) {
                // If user exists, return an error message
                return res.status(400).json({ message: 'Email already exists' });
            }else{
                const newUser = await User.create(req.body);
                // Generate a JWT token for the new user
                const userToken = jwt.sign(
                    { _id: newUser.id, email: newUser.email },
                    secret,
                    { expiresIn: '1d' }
                );
                // Set the user token as a cookie
                res.cookie("userToken", userToken, {
                    httpOnly: true
                 // Return a success message with the new user object
                }).json({ message: "success", user: newUser});
            }
        } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
},
    login: async (req, res) => {
        try{
            // Find the user by email in the database
            const user = await User.findOne({email: req.body.email});
            if(user){// If user is found
                // Compare the entered password with the hashed password in the database
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)

                if(passwordMatch){
                //If user is found generate a JWT token for the user
                    const userToken = jwt.sign({_id:user.id, email:user.email}, secret, {expiresIn: "1d"})

                    // Set the user token as a cookie
                    res.cookie("userToken", userToken, {
                        httpOnly: true
                    }).json({message: "success", user: user})
                // if passwords do not match return an error message
                }else{
                res.status(400).json({message: "Invalid login attempt"})
                }
            
            }else{
                res.status(400).json({message: "Invalid login attempt"})
            }
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
    }
}