const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const billingRoutes = require("./routes/billingRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

require("./models/User");
require("./services/passport");

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = requre("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Listen express app in 5000 port
app.listen(process.env.PORT || 5000);
console.log("Server started successfully");
