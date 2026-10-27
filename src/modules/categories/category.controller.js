const service = require("./category.service");

function getAll(req, res) {
  res.status(200).json({ data: service.getAll() });
}

function getById(req, res) {
  const category = service.getById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.status(200).json({ data: category });
}

function create(req, res) {
  const { name, description } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ message: "name is required and must be a non-empty string" });
  }
  const category = service.create({ name: name.trim(), description: description || "" });
  res.status(201).json({ message: "Category created", data: category });
}

function update(req, res) {
  const { name, description } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ message: "name is required and must be a non-empty string" });
  }
  const category = service.update(req.params.id, { name: name.trim(), description: description || "" });
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.status(200).json({ message: "Category updated", data: category });
}

function remove(req, res) {
  const category = service.remove(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.status(200).json({ message: "Category deleted", data: category });
}

module.exports = { getAll, getById, create, update, remove };