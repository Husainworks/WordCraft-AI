const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPostBySlug,
  updatePost,
  deletePost,
  getPostsByTag,
  searchPosts,
  incrementView,
  likePost,
  getTopPosts,
} = require("../controllers/blogPostController");

const router = express.Router();

router.post("/", protect, adminOnly, createPost);
router.get("/", getAllPosts);
router.get("/slug/:slug", getPostBySlug);
router.put("/:id", protect, adminOnly, updatePost);
router.delete("/:id", protect, adminOnly, deletePost);
router.get("/tag/:tag", getPostsByTag);
router.get("/search", searchPosts);
router.post("/:id/view", incrementView);
router.post("/:id/like", protect, likePost);
router.get("/trending", getTopPosts);

module.exports = router;
