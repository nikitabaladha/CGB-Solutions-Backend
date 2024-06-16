const Blog = require("../../models/Blog");

async function approveCreate(req, res) {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        hasError: true,
        message: "Blog not found",
      });
    }

    if (!blog.createRequest) {
      return res.status(400).json({
        hasError: true,
        message: "No create request for this blog",
      });
    }

    blog.createRequest = false;
    blog.status = "approved";

    await blog.save();

    return res.status(200).json({
      hasError: false,
      message: "Blog create approved successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error during approving blog create:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = approveCreate;
