const express = require("express");
const shortid = require("shortid");
const Posts = require("./data/db.js");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.post("/", (req, res) => {
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post",
    });
  } else {
    Posts.insert(postInfo)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        console.log("error: ", error);
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }

  // Posts.insert(req.body)
  //   .then((post) => {
  //     res.status(201).json(post);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).json({
  //       message: "Error add the post",
  //     });
  //   });
});

module.exports = router;
