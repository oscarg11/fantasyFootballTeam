const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/users/register',UserController.register);
    app.post('/api/users/login',UserController.login);
    app.post('/api/users/logout', UserController.logout)

    // Protected route - only authenticated users can access
    app.get('/dashboard', authenticate, (req, res) => {
        res.json({ message: 'Dashboard' });
    });
    //get logged in user
    app.get('/api/users/loggedIn', authenticate, UserController.getLoggedInUser);
    
    //get all users with teams
    app.get('/api/users/teams', UserController.findAllUsersWithTeams);

}