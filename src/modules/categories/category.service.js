const store = require("../../data/store");

function getAll() { return store.categories; }
function getById(id) { return store.categories.find(item => item.id === id); }

function create({ name, description }) {
  const category = { id: String(Date.now()) + String(Math.floor(Math.random() * 1000)), name, description };
  store.categories.push(category);
  return category;
}

function update(id, values) {
  const category = getById(id);
  if (!category) return null;
  category.name = values.name;
  category.description = values.description;
  return category;
}

function remove(id) {
  const index = store.categories.findIndex(item => item.id === id);
  if (index === -1) return null;
  return store.categories.splice(index, 1)[0];
}

module.exports = { getAll, getById, create, update, remove };