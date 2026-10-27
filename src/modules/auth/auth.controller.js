const service = require("./auth.service");

function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, and password are required" });
  }
  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const user = service.register({ name: name.trim(), email: email.trim().toLowerCase(), password });
    return res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    const result = await service.login(email.trim().toLowerCase(), password);
    return res.status(200).json({ message: "Login successful", ...result });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = { register, login };