const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const newsRouter = require("./routes/news");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const testimonialsRouter = require("./routes/testimonials");
const organizationsRouter = require("./routes/organizations");
const activitiesRouter = require("./routes/activities");
const contactsRouter = require("./routes/contacts");
const categoriesRouter = require("./routes/categories");
const membersRouter = require('./routes/members');
const imagesRouter = require('./routes/images');

const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/activities", activitiesRouter);
app.use('/news', newsRouter);
app.use('/images', imagesRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/contacts", contactsRouter);
app.use("/categories", categoriesRouter);
app.use("/organizations", organizationsRouter);
app.use("/members", membersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
console.log("server ready on port 3000");

module.exports = app;
