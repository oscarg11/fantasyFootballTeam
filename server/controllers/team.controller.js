const Team = require('../models/team.model')
const User = require("../models/user.model");
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports.createNewTeam = async (req, res) => {
  try {
    const newTeamObject = await new Team(req.body);
    console.log("New TEam object:", newTeamObject)
    const decodedJWT = await jwt.decode(req.cookies.userToken, {
      complete: true
    })
    console.log("DECODED JWT:", decodedJWT)
    newTeamObject.createdBy = await decodedJWT.payload._id
    console.log("CREATED BY", newTeamObject.createdBy)
    newTeamObject.save()
      .then(async (userTeam) => {
        const foundUser = await User.findOneAndUpdate({ _id: userTeam.createdBy }, { $push: { team: userTeam } }, { new: true, runValidators: true })
        return foundUser
      })

      .then(newlyCreatedTeam => {
        console.log(newlyCreatedTeam)
        return res.json({ team: newlyCreatedTeam })
      })
      .catch((err) => {
        return res.status(400).json({ message: 'Something went wrong', error: err })
      });

  } catch (err) {
    res.status(400).json({ message: 'Something went wrong', error: err })
  }
}
//get single user's teams 
module.exports.getSingleTeam = (req, res) => {
  console.log(req.params)
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid team ID' });
  }
  Team.findOne({_id: req.params.id})
    .populate("createdBy", "firstName lastName")
  .then((oneTeam) => {
    console.log("Single Team", oneTeam)
      // if (!oneTeam) {
      //   return res.status(404).json({ message: 'Team not found' });
      // }
      res.json({ oneTeam: oneTeam });
    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong', error: err }));
};

module.exports.getTeam = (req,res) => {
  console.log("Display Team",req.params)
  Team.find({ createdBy: req.params.id})
  .then((teams) => {
    console.log("Teams", teams);
    res.json({ teams });
  })
  .catch((err) => res.status(500).json({ message: 'Something went wrong', error: err }));
}


// Update a team by ID
module.exports.updateTeam = async (req, res) => {
  try {
    const updatedTeamObject = await Team.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    console.log("REQ.PARAMS.ID", req.params.id)
    console.log("REQ.BODY!!!", req.body)
    console.log("Team updated!", updatedTeamObject);
    return res.json({ team: updatedTeamObject });
  } catch (err) {
    return res.status(400).json({ message: 'Something went wrong', error: err });
  }
}


// Delete a team by ID
module.exports.deleteTeam = (req, res) => {
  const teamId = req.params.id;
  Team.findByIdAndDelete(teamId)
    .then(() => {
      res.json({ message: 'Team deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
}

// Get all teams with their owner
module.exports.getAllTeamsWithUsers = async (req, res) => {
  try {
    const teams = await Team.find().populate('users', 'firstName lastName');
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

