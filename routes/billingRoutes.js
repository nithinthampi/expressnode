var keys = require("../config/keys");
var stripe = require("stripe")(keys.stripeSecretKey);
var requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charges = await stripe.charges.create({
      amount: 2000,
      description: "Add credits for emaily",
      currency: "usd",
      source: req.body.id
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
