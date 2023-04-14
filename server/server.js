const express = require('express');
const cors = require('cors')//allows for cross origin requests
const app = express();
const port = 8000;

require('./config/mongoose.config');//import config
app.use(cors())

app.use(express.json(), express.urlencoded({extended: true}));//allows Json objects and strings and arrays

// CHANGE THE ROUTE!!
// const AllMyRoutes = require('./routes/store.routes')//import routes
// AllMyRoutes(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );