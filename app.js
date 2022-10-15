const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const Items = ["Buy Food", "Cook Food", "Eat Food"];
const WorkItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { ListTitle: day, newlistsItems: Items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    WorkItems.push(item);
    res.redirect("/work");
  } else {
    Items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work List", newlistsItems: WorkItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItems;
  item.push(WorkItems);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("The server is running on the port http://localhost:3000");
});
