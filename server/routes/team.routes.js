const TeamController = require('../controllers/team.controller');
const Team = require('../models/team.model');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  // Create a new team
  app.post('/api/teams/create', TeamController.createNewTeam);

  //get all teams with owners
  app.get('/api/teams', TeamController.getAllTeamsWithUsers);
  
   //get single team detail
  app.get('/api/teamDetails/:id',TeamController.getSingleTeam)
   // Protected route - only authenticated users can access
   app.get('/displayTeam/:id', authenticate, (req, res) => {
    res.json({ message: 'displayTeam' });
});
  //get one team
  app.get('/api/singleTeam/:id',TeamController.getTeam)
  // Update a team by ID
  app.put('/api/teams/update/:id',authenticate, TeamController.updateTeam);
  
    // Delete a team by ID
  app.delete('/api/teams/delete/:id', TeamController.deleteTeam);
  };