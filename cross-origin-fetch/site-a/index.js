const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.set("Content-Type", "text/html");
  res.send(fs.readFileSync(path.join(__dirname, "./pages/index.html")));
})

app.get("/openwindow", function (req, res) {
  res.set("Content-Type", "text/html");
  res.send(fs.readFileSync(path.join(__dirname, "./pages/openwindow.html")));
})

app.listen(port, function () {
  console.log("site-a started at port ", port);
})