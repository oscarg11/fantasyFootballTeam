const User = require("../models/user.model");
const Team = require('../models/team.model')
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
            console.log("user:", user)
            if(user){// If user is found
                // Compare the entered password with the hashed password in the database
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)

                if(passwordMatch){
                    console.log("login succesful!", user)
                //If user is found generate a JWT token for the user
                    const userToken = jwt.sign({_id:user.id, email:user.email}, secret, {expiresIn: "1d"})

                    // Set the user token as a cookie
                    res.cookie("userToken", userToken, {
                        httpOnly: true
                    }).json({message: "success", user: user})
                // if passwords do not match return an error message
                }else{
                console.log("login failed!@!#")
                res.status(400).json({message: "Invalid login attempt"})
                }
            
            }else{
                console.log("LOGIN FAILED!!!")
                res.status(400).json({message: "Invalid login attempt"})
            }
    }
    catch(err){
        console.log("LOGIN FAILED DAWG",err);
        return res.status(400).json(err);
    }
    },
    logout: async(req, res) => {
        try{
            res.clearCookie("userToken").json({message: "success"});
        }
        catch(err){
            console.log(err);
            return res.status(400).json(err);
        }
    },
    //get all users with teams

    // findAllUsersWithTeams: async (req, res) => {
    //     try{
    //         const users = await User.findAll({
    //             include: [{ model: Team }]
    //         })
    //         res.status(200).json(users)
    //     }catch(err){
    //         console.error(err);
    //         res.status(400).json({ message: 'SERVER ERROR'})
    //     }
        findAllUsersWithTeams: async (req, res) => {
        try {
          // find all users and populate their 'team' field with team data
        const users = await User.find().populate('team', 'name players');
            console.log("Users with teams", users)
          // return users with teams data
          res.status(200).json(users);
        } catch (err) {
          console.error(err);
          res.status(400).json({ message: 'SERVER ERROR' });
        }
    },
    // getASingleUserWithTeam: async (req, res) => {
    // try {
    //     const teamId = req.params.id;
    //     console.log("team ID",teamId)
    //     const team = await Team.findOne({ _id: teamId })
    //     .populate('createdBy', 'firstName lastName') // populate createdBy user's first and last name
    //     .populate('players', 'name') // populate the name of the players on the team
    //     .select('name players'); // select only the name and players fields of the team
        
    //     if (!team) {
    //     return res.status(404).json({ message: 'Team not found' });
    //     }
    
    //     const user = await User.findOne({ team: teamId })
    //     .select('firstName lastName'); // select only the first and last name of the user
        
    //     if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    //     }
    
    //     return res.status(200).json({ user, team });
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({ message: 'SERVER ERROR' });
    // }
    // },
      
    getLoggedInUser: (req, res) => {
        console.log("Logged in user Function")
        console.log("PAYLOAD ID",req.jwtpayload)
        User.findOne({_id: req.jwtpayload._id})
        .then(( LoggedInUser ) => {
            console.log("Logged in user", LoggedInUser)
            res.status(200).json(LoggedInUser)
        })
        .catch( err => {
            console.log(err)
            return res.status(400).json(err)
        })
    }
}
