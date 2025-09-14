const {
  isValidName,
  isAdult,
  isValidEmail,
  isValidPassword,
} = require("./validators");

// In-memory DB (for the task requirement). Each entry: { user_name, dob, email, password }
const db = [];

const ERROR_CODES = {
  USER_ALREADY_REGISTERED: "USER_ALREADY_REGISTERED",
  INVALID_NAME: "INVALID_NAME",
  INVALID_DOB: "INVALID_DOB",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PASSWORD: "INVALID_PASSWORD",
};

function findByUserName(user_name) {
  return db.find(
    (u) => u.user_name.toLowerCase() === String(user_name).toLowerCase()
  );
}

function findByEmail(email) {
  return db.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
}

function insert_user(user_name, dob, email, password) {
  // Validate name
  if (!isValidName(user_name))
    return {result: false, code: ERROR_CODES.INVALID_NAME};

  // Validate dob
  if (!isAdult(dob)) return {result: false, code: ERROR_CODES.INVALID_DOB};

  // Validate email
  if (!isValidEmail(email))
    return {result: false, code: ERROR_CODES.INVALID_EMAIL};

  // Validate password
  if (!isValidPassword(password))
    return {result: false, code: ERROR_CODES.INVALID_PASSWORD};

  // Uniqueness
  if (findByUserName(user_name) || findByEmail(email)) {
    return {result: false, code: ERROR_CODES.USER_ALREADY_REGISTERED};
  }

  // Insert
  db.push({user_name, dob: new Date(dob).toISOString(), email, password});
  return {result: true, code: null};
}

// helper for tests to reset DB
function _reset_db() {
  db.length = 0;
}

module.exports = {insert_user, ERROR_CODES, _reset_db, db};
