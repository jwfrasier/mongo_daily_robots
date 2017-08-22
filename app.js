const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb")

const url = "mongodb://127.0.0.1:27017/robots"
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get("/", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("Connected")
    db.collection("users").find().toArray().then(function(users) {
      res.render("index", {
        users: users
      })
    })
  })
})

app.get("/users/:id", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    db.collection("users").findOne({
      id: parseInt(req.params.id)
    }).then(function(user) {
      res.render("person", {
        user: user
      })
    })
  })
})

app.listen(3000, function() {
  console.log("Listening on 3000")
})
