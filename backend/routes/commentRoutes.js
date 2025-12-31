const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addComment,
  getCommentsByPost,
  getAllComments,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/:postId", protect, addComment);
router.get("/:postId", getCommentsByPost);
router.get("/", getAllComments);
router.delete("/:commentId", protect, deleteComment);

module.exports = router;
