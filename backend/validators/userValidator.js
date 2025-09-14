function getAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function isValidName(name) {
  if (typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length >= 5 && trimmed.length <= 16;
}

function isValidDOB(dob) {
  if (!(dob instanceof Date) || isNaN(dob.getTime())) return false;
  if (dob > new Date()) return false; // future
  return getAge(dob) >= 18;
}

function isValidEmail(email) {
  if (typeof email !== "string") return false;
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$/;
  return re.test(email.trim());
}

function isValidPassword(password) {
  if (typeof password !== "string") return false;
  if (password.length < 5 || password.length > 16) return false;
  if (!/[A-Z]/.test(password)) return false;
  const digits = (password.match(/\d/g) || []).length;
  if (digits < 2) return false;
  return true;
}

module.exports = {isValidName, isValidDOB, isValidEmail, isValidPassword};
function getAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function isValidName(name) {
  if (typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length >= 5 && trimmed.length <= 16;
}

function isValidDOB(dob) {
  if (!(dob instanceof Date) || isNaN(dob.getTime())) return false;
  if (dob > new Date()) return false; // future
  return getAge(dob) >= 18;
}

function isValidEmail(email) {
  if (typeof email !== "string") return false;
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$/;
  return re.test(email.trim());
}

function isValidPassword(password) {
  if (typeof password !== "string") return false;
  if (password.length < 5 || password.length > 16) return false;
  if (!/[A-Z]/.test(password)) return false;
  const digits = (password.match(/\d/g) || []).length;
  if (digits < 2) return false;
  return true;
}

module.exports = {isValidName, isValidDOB, isValidEmail, isValidPassword};
