const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];

app.get("/" , function(req, res){
  res.render("home", {homeContent: homeStartingContent, newContent: posts});
})

app.post("/" , function(req, res){

})

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res){

  const post = {
    title: req.body.posttitle,
    content: req.body.postbody
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:topic", function(req, res){

  const requestedTitle = _.lowerCase(req.params.topic);

  posts.forEach((item, i) => {
    const storedTitle = _.lowerCase(item.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {postTitle: item.title, postContent: item.content });
    }
  });

});

app.listen(3000, function(){
  console.log("Server started on port 3000");
})
