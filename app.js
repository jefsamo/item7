const path = require("path");
const querystring = require("querystring");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const cartRouter = require("./routes/cartRoutes");
const searchRouter = require("./routes/searchRoutes");
const viewRouter = require("./routes/viewRoutes");
const GlobalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
app.use(express.static(path.join(__dirname, "/starter/public")));

// Development logging
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use("/api", limiter);
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
