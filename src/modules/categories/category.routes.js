const express = require("express");
const controller = require("./category.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", authenticate, controller.create);
router.put("/:id", authenticate, controller.update);
router.delete("/:id", authenticate, controller.remove);

module.exports = router;