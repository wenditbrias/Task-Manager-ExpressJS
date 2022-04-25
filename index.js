require("dotenv").config({ debug: true });

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const conn = require("./db/conn");
const router = require("./router");

const port = process.env.PORT;

app.set("view engine", "ejs");
app.use("/",express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser(`${process.env.SECRET}`));
app.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);

app.use(flash());
app.use(router);

app.listen(port, conn);
