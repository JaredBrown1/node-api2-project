const express = require("express");
const shortid = require("shortid");
const Posts = require("./data/db.js");

const router = express.Router();

//POST to /api/posts
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
});

//POST new comment to /:id/comments
// router.post("/:id/comments", (req, res) => {
//   const postInfo = req.params.id;
//   Posts.insertComment(postInfo)
//     .then((post) => {
//       res.status(201).json(post);
//     })
//     .catch((error) => {
//       console.log("error: ", error);
//       res.status(500).json({
//         error: "There was an error while creating a new comment",
//       });
//     });
// });

//GET array of posts
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

// GET array of posts by ID
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
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

// GET array of comment objects by specific id
router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving comment",
      });
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the post",
      });
    });
});

module.exports = router;
