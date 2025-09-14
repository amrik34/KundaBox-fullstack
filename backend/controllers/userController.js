const User = require("../models/User"); // ⬅️ Add this line
const {insert_user} = require("../services/userService");

// POST /api/users
const createUser = async (req, res) => {
  try {
    console.log("📩 Request body:", req.body);

    const {user_name, dob, email, password} = req.body;
    const result = await insert_user(user_name, new Date(dob), email, password);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({result: false, code: "SERVER_ERROR"});
  }
};

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json({result: true, users});
  } catch (err) {
    console.error(err);
    res.status(500).json({result: false, code: "SERVER_ERROR"});
  }
};

module.exports = {createUser, getUsers};
