const Blog = require("../../models/Blog");

async function getOneById(req, res) {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      return res.status(400).json({
        hasError: true,
        message: "Bad Request: Blog ID is required",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        hasError: true,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Blog retrieved successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error during retrieving Blog:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = getOneById;
