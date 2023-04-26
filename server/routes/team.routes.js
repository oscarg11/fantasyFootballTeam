const TeamController = require('../controllers/team.controller');
const Team = require('../models/team.model');

module.exports = app => {
  // Create a new team
  app.post('/api/teams/create', TeamController.createNewTeam);

  //get all teams with owners
  app.get('/api/teams', TeamController.getAllTeamsWithUsers);
  
   //get single team detail
  app.get('/api/teamDetails/:id', TeamController.getSingleTeam)

  app.get('/api/singleTeam/:id',TeamController.getTeam)
  // Update a team by ID
  app.put('/api/teams/:id', TeamController.updateTeam);
  
    // Delete a team by ID
  app.delete('/api/teams/:id', TeamController.deleteTeam);
  };