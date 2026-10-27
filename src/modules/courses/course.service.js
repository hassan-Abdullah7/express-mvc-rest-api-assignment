const store = require("../../data/store");

function getAll() { return store.courses; }
function getById(id) { return store.courses.find(item => item.id === id); }

function create(values) {
  const course = {
    id: String(Date.now()) + String(Math.floor(Math.random() * 1000)),
    ...values
  };
  store.courses.push(course);
  return course;
}

function update(id, values) {
  const course = getById(id);
  if (!course) return null;
  Object.assign(course, values);
  return course;
}

function remove(id) {
  const index = store.courses.findIndex(item => item.id === id);
  if (index === -1) return null;
  return store.courses.splice(index, 1)[0];
}

module.exports = { getAll, getById, create, update, remove };