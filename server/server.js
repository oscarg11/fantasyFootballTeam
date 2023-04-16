const express = require('express');
const cors = require('cors')//allows for cross origin requests
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

require('dotenv').config();

require('./config/mongoose.config');//import config
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.json(), express.urlencoded({extended: true}));//allows Json objects and strings and arrays

// CHANGE THE ROUTE!!
const AllMyRoutes = require('./routes/user.routes')//import routes
AllMyRoutes(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );