// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const jwt = require('jsonwebtoken');

// // ✅ MongoDB Connection
// const db = require("./config/mongoose-connection");

// // ✅ Import Models
// const Material = require('./models/materialModel');
// const Expense = require('./models/expenseModel'); // 
// // ✅ Import Routes
// const usersRouter = require("./routes/usersRouter");
// const materialsRouter = require("./routes/materialsRouter");
// const expensesRouter = require("./routes/expensesRouter");

// // ✅ Middleware
// const isLoggedIn = require("./middlewares/isLoggedIn");

// // 🔧 Express Middleware Setup
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// // 🖼️ View Engine Setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // 🏠 Auth Page (Login/Register)
// app.get("/", (req, res) => {
//   res.render("auth"); // views/auth.ejs
// });

// // ✅ Dashboard Route with materials + expenses
// app.get("/dashboard", isLoggedIn, async (req, res) => {
//   try {
//     const materials = await Material.find({ userId: req.user._id }).sort({ purchaseDate: -1 });
//     const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });

//     res.render("dashboard", {
//       user: req.user,
//       materials,
//       expenses,
//     });
//   } catch (err) {
//     console.error("Error loading dashboard:", err);
//     res.render("dashboard", {
//       user: req.user,
//       materials: [],
//       expenses: [],
//     });
//   }
// });

// // ✅ Routes
// app.use("/users", usersRouter);
// app.use("/materials", materialsRouter);
// app.use("/expenses", expensesRouter);

// // 🚀 Start Server
// app.listen(3000, () => {
//   console.log("🚀 Server running at http://localhost:3000");
// });
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

// ✅ MongoDB Connection
const db = require("./config/mongoose-connection");

// ✅ Import Models
const Material = require('./models/materialModel');
const Expense = require('./models/expenseModel');

// ✅ Import Routes
const usersRouter = require("./routes/usersRouter");
const materialsRouter = require("./routes/materialsRouter");
const expensesRouter = require("./routes/expensesRouter");
const reportsRouter = require('./routes/reportsRouter');

// ✅ Middleware
const isLoggedIn = require("./middlewares/isLoggedIn");

// 🔧 Express Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 🖼️ View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🏠 Auth Page (Login/Register)
app.get("/", (req, res) => {
  res.render("auth"); // views/auth.ejs
});

// ✅ Dashboard Route with materials and expenses
app.get("/dashboard", isLoggedIn, async (req, res) => {
  try {
    const materials = await Material.find({ userId: req.user._id }).sort({ purchaseDate: -1 });
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    const success = req.query.success;
    res.render("dashboard", { user: req.user, materials, expenses, success });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.render("dashboard", { user: req.user, materials: [], expenses: [], success: false });
  }
});

// ✅ Delete Expense Route (optional feature)
app.post("/expenses/delete/:id", isLoggedIn, async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.params.id, userId: req.user._id });
    res.redirect("/dashboard?success=deleted");
  } catch (err) {
    console.error("Failed to delete expense:", err);
    res.redirect("/dashboard");
  }
});

// ✅ Routes
app.use("/users", usersRouter);
app.use("/materials", materialsRouter);
app.use("/expenses", expensesRouter);
app.use('/reports', reportsRouter);



// 🚀 Start Server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
