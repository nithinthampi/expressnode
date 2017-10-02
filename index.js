const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require('./config/keys');

const expressRoutes = require("./routes/expressRoutes");
const mongoose = require("mongoose");


mongoose.connect(keys.mongoURI,{
    useMongoClient:true
});

require('./models/User');
require("./services/passport")

app.use(cookieSession({
    maxAge : 30 *24*60*60*1000,
    keys:[keys.cookieKey]
}));


app.use(passport.initialize());
app.use(passport.session());
expressRoutes(app);


//Listen express app in 5000 port
app.listen(5000);
console.log("Server started successfully");
