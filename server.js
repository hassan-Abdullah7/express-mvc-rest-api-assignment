require("dotenv").config();
const express = require("express");
const authRoutes = require("./src/modules/auth/auth.routes");
const categoryRoutes = require("./src/modules/categories/category.routes");
const courseRoutes = require("./src/modules/courses/course.routes");
const { notFound, errorHandler } = require("./src/middleware/error.middleware");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Express MVC REST API is running",
    endpoints: ["/api/auth/register", "/api/auth/login", "/api/categories", "/api/courses"]
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));