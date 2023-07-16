import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
const upload = multer();
import homepageRouter from "./homepageRouter.js";
import todos from "./todos.js";
import assetsRouter from "./assetsRouter.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");
const distPath = path.join(path.resolve(), "dist");

const app = express();

// Creating the Database and Connecting
// =============================================================================
mongoose.connect("mongodb://127.0.0.1:27017/mevn_todo");

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/todos", todos);
app.use(homepageRouter);

// //Use the Router on the sub route /movies
// app.use('/api', todos);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}

app.listen(port, () => {
  console.log("Server listening on port", port);
});
