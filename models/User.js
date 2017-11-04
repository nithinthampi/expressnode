const mongoose = require("mongoose");

mongoose.model("users", {
  googleUserId: Number,
  credits: { type: Number, default: 0 }
});
