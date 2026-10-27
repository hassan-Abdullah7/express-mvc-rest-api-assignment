const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const store = require("../../data/store");

function register({ name, email, password }) {
  if (store.users.some(user => user.email === email)) {
    throw new Error("Email is already registered");
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = {
    id: String(Date.now()),
    name,
    email,
    passwordHash
  };
  store.users.push(user);
  return { id: user.id, name: user.name, email: user.email };
}

async function login(email, password) {
  const user = store.users.find(item => item.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "development_secret_change_me",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email }
  };
}

module.exports = { register, login };