const Blog = require("../../models/Blog");
const blogValidationSchema = require("../../validators/blogValidationSchema.js");

async function update(req, res) {
  try {
    const userId = req.user.id;
    const blogId = req.params.id;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can update Blog",
      });
    }

    if (!blogId) {
      return res.status(400).json({
        hasError: true,
        message: "Blog ID is required",
      });
    }

    const { title, author, date, summary } = req.body;

    const bannerImageUrl = req.files.bannerImageUrl
      ? req.files.bannerImageUrl[0].path
      : null;
    const contentImageUrl = req.files.contentImageUrl
      ? req.files.contentImageUrl[0].path
      : null;

    const { error } = blogValidationSchema.validate({
      title,
      author,
      date,
      summary,
    });

    if (error) {
      return res.status(400).json({
        hasError: true,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        hasError: true,
        message: "Not Found: Blog not found",
      });
    }

    if (blog.userId.toString() !== userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: You do not have permission to update this blog",
      });
    }

    blog.title = title;
    blog.author = author;
    blog.date = date;
    blog.summary = summary;
    blog.bannerImageUrl = bannerImageUrl || blog.bannerImageUrl;
    blog.contentImageUrl = contentImageUrl || blog.contentImageUrl;
    blog.status = "pending";

    const updatedBlog = await blog.save();

    return res.status(200).json({
      hasError: false,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error during updating Blog:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = update;
