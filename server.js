const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const index = require("./server/routes/app");
const noteRoutes = require("./server/routes/notes");

mongoose.connect("mongodb://127.0.0.1:27017/study-journal",
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      console.log(`Connection failed: ${err}`);
    } else {
      console.log("Connected to database!");
    }
  }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.static(path.join(__dirname, "dist/study-journal")));
app.use("/", index);
app.use("/notes", noteRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/study-journal/index.html"));
});

const port = process.env.PORT || "3000";
app.set("port", port);
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
