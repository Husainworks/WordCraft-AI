const BlogPost = require("../models/BlogPost");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  try {
    const { title, content, coverImageUrl, tags, isDraft, generatedByAI } =
      req.body;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const newPost = new BlogPost({
      title,
      slug,
      content,
      coverImageUrl,
      tags,
      author: req.user._id,
      isDraft,
      generatedByAI,
    });

    await newPost.save();
    res.status(201).json({
      message: "Post created Successfully",
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const status = req.query.status || "published";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    let filter = {};
    if (status === "published") filter.isDraft = false;
    else if (status === "draft") filter.isDraft = true;

    const posts = await BlogPost.find(filter)
      .populate("author", "name profileImageUrl")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    const [totalCount, allCount, publishedCount, draftCount] =
      await Promise.all([
        BlogPost.countDocuments(filter),
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ isDraft: false }),
        BlogPost.countDocuments({ isDraft: true }),
      ]);

    res.status(200).json({
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allCount,
        published: publishedCount,
        draft: draftCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug })
      .populate("author", "name profileImageUrl")
      .lean();

    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not Found",
      });
    }

    if (post.author.toString() !== req.user._id.toString() && !req.user.admin) {
      return res.status(403).json({
        message: "Not Authorized to update this post",
      });
    }

    const updatedData = req.body;
    if (updatedData.title) {
      updatedData.slug = updatedData.title.toLowerCase().replace(/ /g, "-");
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Post Updated Successfully",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not Found",
      });
    }

    await post.deleteOne();
    res.status(200).json({
      message: "Post deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getPostsByTag = async (req, res) => {
  try {
    const posts = await BlogPost.find({
      tags: req.params.tag,
      isDraft: false,
    }).populate("author", "name profileImageUrl");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const searchPosts = async (req, res) => {
  try {
    const q = req.query.q;
    const posts = await BlogPost.find({
      isDraft: false,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    }).populate("author", "name profileImageUrl");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const incrementView = async (req, res) => {
  try {
    await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json({
      message: "View count incremented",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();

    res.status(200).json({
      message: alreadyLiked ? "Like removed" : "Like added",
      liked: !alreadyLiked,
      totalLikes: post.likes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getTopPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ isDraft: false })
      .sort({
        views: -1,
        likes: -1,
      })
      .limit(5);
    res.status(200).json({
      message: "Top posts fetched Successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
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
};
