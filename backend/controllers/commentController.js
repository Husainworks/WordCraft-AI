const Comment = require("../models/Comment");
const BlogPost = require("../models/BlogPost");

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not Found",
      });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content,
      parentComment: parentComment || null,
    });

    await comment.populate("author", "name profileImageUrl");

    res.status(201).json({
      message: "Comment added Successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add a comment",
      error: error.message,
    });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 });

    const commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    const nestedComments = [];

    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.status(200).json({
      message: "Fetched comments Successfully",
      nestedComments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 });

    const commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    const nestedComments = [];

    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.status(200).json({
      message: "Fetched All comments Successfully",
      nestedComments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all comments",
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not Found",
      });
    }

    await Comment.deleteOne({ _id: commentId });

    await Comment.deleteMany({ parentComment: commentId });

    res.status(200).json({
      message: "Comment and any replies deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete a comment",
      error: error.message,
    });
  }
};

module.exports = {
  addComment,
  getCommentsByPost,
  getAllComments,
  deleteComment,
};
