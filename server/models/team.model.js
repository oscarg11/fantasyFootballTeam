const mongoose = require('mongoose');
const User = require('./user.model')
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    minlength: [2, "Team Name must be at least 2 characters"],
    maxlength: [255, "Team Name must be less than 255 charcters"]
  },
  players: [{
    type: String, 
    required: [true, "You must have players on your team"],
    // validate: {
    //   validator: function(arr) {
    //     return arr.length === 11; // Maximum array length of 10
    //    },
    //    message: 'Array length cannot be more than 11',
    //  }
    //  minlength: [11, "Team must be at least 11 players"],
    //  maxlength: [11, "Team must be less than 11 players"]
    //validate: [players => players.length === 11, "You must have exactly 11 players on your team"]
}],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

teamSchema.path('players').validate(function (value) {
  console.log(value.length)
  if (value.length !== 11) {
    throw new Error("Team must be 11 players");
  }
});

// teamSchema.pre('save', async function (next) {
//   try {
//     const players = this.players.flat(); // flatten the players array
//     const playerObjects = await Promise.all(
//       players.map(async (playerName) => {
//         const player = await Player.findOne({ name: playerName });
//         return player._id;
//       })
//     );
//     this.players = playerObjects;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });


const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
