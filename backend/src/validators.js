const NAME_MIN = 5;
const NAME_MAX = 16;
const PASS_MIN = 5;
const PASS_MAX = 16;

function isValidName(name) {
  if (typeof name !== "string") return false;
  const len = name.trim().length;
  return len >= NAME_MIN && len <= NAME_MAX;
}

function isAdult(dob) {
  const date = new Date(dob);
  if (isNaN(date)) return false;
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
}

function isValidEmail(email) {
  if (typeof email !== "string") return false;
  // simple but adequate regex for xxx@yyyy.com style
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}

function isValidPassword(pw) {
  if (typeof pw !== "string") return false;
  const len = pw.length;
  if (len < PASS_MIN || len > PASS_MAX) return false;
  const digits = (pw.match(/\d/g) || []).length;
  const upper = (pw.match(/[A-Z]/g) || []).length;
  return digits >= 2 && upper >= 1;
}

module.exports = {isValidName, isAdult, isValidEmail, isValidPassword};
