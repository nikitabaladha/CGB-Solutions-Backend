const Blog = require("../../models/Blog");

async function approveUpdate(req, res) {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        hasError: true,
        message: "Blog not found",
      });
    }

    if (!blog.updateRequest) {
      return res.status(400).json({
        hasError: true,
        message: "No update request for this blog",
      });
    }

    blog.title = blog.proposedChanges.title || blog.title;
    blog.date = blog.proposedChanges.date || blog.date;
    blog.summary = blog.proposedChanges.summary || blog.summary;
    blog.bannerImageUrl =
      blog.proposedChanges.bannerImageUrl || blog.bannerImageUrl;
    blog.contentImageUrl =
      blog.proposedChanges.contentImageUrl || blog.contentImageUrl;

    blog.updateRequest = false;
    blog.proposedChanges = {};
    blog.status = "approved";

    await blog.save();

    return res.status(200).json({
      hasError: false,
      message: "Blog update approved successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error during approving blog update:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = approveUpdate;
