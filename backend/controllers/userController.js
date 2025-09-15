const User = require("../models/User");
const {insert_user} = require("../services/userService");

// POST /api/users
const createUser = async (req, res) => {
  try {
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

// PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const {user_name, dob, email, password} = req.body;
    const {id} = req.params;

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({result: false, code: "USER_NOT_FOUND"});

    user.user_name = user_name;
    user.dob = dob;
    user.email = email;
    if (password) user.password = password; // only update if provided

    await user.save();

    return res.json({result: true, user}); // ✅ must wrap updated user
  } catch (err) {
    console.error(err);
    return res.status(500).json({result: false, code: "SERVER_ERROR"});
  }
};

// const updateUser = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const {user_name, dob, email} = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       {user_name, dob: new Date(dob), email},
//       {new: true, runValidators: true}
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({result: false, message: "User not found"});
//     }

//     res.json(updatedUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({result: false, code: "SERVER_ERROR"});
//   }
// };

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({result: false, message: "User not found"});
    }

    res.json({result: true, message: "User deleted successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({result: false, code: "SERVER_ERROR"});
  }
};

module.exports = {createUser, getUsers, updateUser, deleteUser};
