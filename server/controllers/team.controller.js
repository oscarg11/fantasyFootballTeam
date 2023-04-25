const Team = require('../models/team.model')
const User = require("../models/user.model");
const jwt = require('jsonwebtoken')
//create a new team
// module.exports.createNewTeam = async (req, res) => {
//   try {
//     const userId = req.user._id; //Get the ID of the currently authenticated user

//     //Create a new team with the provided name and the ID of the team owner
//     const newTeam = await Team.create({
//       name: req.body.name,
//       owner: userId
//     });

//     //Add the newly created team ID to the list of teams of the team owner
//     await User.findByIdAndUpdate(userId, { $push: { teams: newTeam._id } });

//     res.json({ team: newTeam });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: 'Something went wrong', error: err });
//   }
// }
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
//get single team
module.exports.getSingleTeam = (req, res) => {
  Team.findById(req.body.id)
  console.log(req.body.id)
  //.populate('createdBy', 'firstName lastName')
  .then((oneTeam) => {
    res.json({team: oneTeam})

  })
  .catch((err) => {
    res.json({message: "something went wrong", error: err})
  })
};

// createCustoms: (req, res) => {

//   const newCustomObject = new Custom(req.body);

//   const decodedJWT = jwt.decode(req.cookies.userToken, {
//       complete: true
//   })

//   newCustomObject.createdBy = decodedJWT.payload.id;

//   newCustomObject.save()

//       .then((custom) => {
//           console.log('custom!!!', custom);
//           return res.json(custom)
//       })
//       .catch((err) => {
//           res.status(400).json({ err });
//           console.log("custom order not added");
//       })
// },

// Get a single team by ID
module.exports.getSingleTeam = (req, res) => {
  const teamId = req.params.id;
  Team.findById(teamId)
    .populate('users', 'firstName lastName') // assuming you have a 'players' field in your Team model that stores the IDs of players in the team
    .then(foundTeam => {
      res.json({ team: foundTeam });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
}

// Update a team by ID
module.exports.updateTeam = (req, res) => {
  const teamId = req.params.id;
  Team.findByIdAndUpdate(teamId, req.body, { new: true })
    .then(updatedTeam => {
      res.json({ team: updatedTeam });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
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

