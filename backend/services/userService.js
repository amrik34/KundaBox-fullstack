const User = require("../models/User");

// Validation helpers
const isValidName = (name) => /^[A-Za-z ]+$/.test(name); // only letters
const isValidDOB = (dob) => !isNaN(new Date(dob).getTime()); // valid date
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidPassword = (pwd) => pwd.length >= 6;

const insert_user = async (user_name, dob, email, password) => {
  if (!isValidName(user_name)) return {result: false, code: "INVALID_NAME"};
  if (!isValidDOB(dob)) return {result: false, code: "INVALID_DOB"};
  if (!isValidEmail(email)) return {result: false, code: "INVALID_EMAIL"};
  if (!isValidPassword(password))
    return {result: false, code: "INVALID_PASSWORD"};

  // Check if email exists
  const exists = await User.findOne({email});
  if (exists) return {result: false, code: "EMAIL_EXISTS"};

  const user = new User({user_name, dob, email, password});
  await user.save();

  return {result: true, code: "USER_CREATED", user};
};

module.exports = {insert_user};
