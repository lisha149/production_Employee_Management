require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./models/index");
const usersRouter = require("./routes/userRoutes");
const deptRouter = require("./routes/deptRoutes");
const leaveRouter = require("./routes/leaveRoutes");
const profileRouter = require("./routes/profileRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const { notFound } = require("./middleware/error");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", usersRouter);
app.use("/api", deptRouter);
app.use("/api", leaveRouter);
app.use("/api", profileRouter);
app.use("/api", dashboardRouter);
app.use(notFound);

//static files
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port :http://localhost:${PORT}`)
  );
});
