const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const logger = require("morgan");

const api = require("./routes/api");
const view = require("./routes/view");

dotenv.config();
const server = express();

server.use(cors());

server.set("views", `${__dirname}/views`);
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use(methodOverride("_method"));

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public")));

server.use("/api", api);
server.use("/", view);

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

// module.exports = server;
