const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: {type: String, required: true},
    dob: {type: Date, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
  },
  {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
