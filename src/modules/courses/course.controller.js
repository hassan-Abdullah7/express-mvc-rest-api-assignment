const service = require("./course.service");
const categoryService = require("../categories/category.service");

function getAll(req, res) {
  res.status(200).json({ data: service.getAll() });
}

function getById(req, res) {
  const course = service.getById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.status(200).json({ data: course });
}

function validate(body) {
  if (!body.title || typeof body.title !== "string" || !body.title.trim()) return "title is required";
  if (!body.categoryId) return "categoryId is required";
  if (body.duration === undefined || body.duration === null || body.duration === "") return "duration is required";
  if (Number.isNaN(Number(body.duration)) || Number(body.duration) <= 0) return "duration must be a positive number";
  return null;
}

function create(req, res) {
  const error = validate(req.body);
  if (error) return res.status(400).json({ message: error });
  if (!categoryService.getById(String(req.body.categoryId))) {
    return res.status(400).json({ message: "categoryId must refer to an existing category" });
  }
  const course = service.create({
    title: req.body.title.trim(),
    description: req.body.description || "",
    duration: Number(req.body.duration),
    categoryId: String(req.body.categoryId)
  });
  res.status(201).json({ message: "Course created", data: course });
}

function update(req, res) {
  const error = validate(req.body);
  if (error) return res.status(400).json({ message: error });
  if (!categoryService.getById(String(req.body.categoryId))) {
    return res.status(400).json({ message: "categoryId must refer to an existing category" });
  }
  const course = service.update(req.params.id, {
    title: req.body.title.trim(),
    description: req.body.description || "",
    duration: Number(req.body.duration),
    categoryId: String(req.body.categoryId)
  });
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.status(200).json({ message: "Course updated", data: course });
}

function remove(req, res) {
  const course = service.remove(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.status(200).json({ message: "Course deleted", data: course });
}

module.exports = { getAll, getById, create, update, remove };