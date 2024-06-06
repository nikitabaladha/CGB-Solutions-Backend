// controllers/Blog/create.js
const Blog = require("../../models/Blog");
const blogValidationSchema = require("../../validators/blogValidationSchema.js");

async function create(req, res) {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can create Blog",
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

    const newBlog = await Blog.create({
      userId,
      bannerImageUrl,
      contentImageUrl,
      title,
      author,
      date,
      summary,
      status: "pending",
    });

    return res.status(201).json({
      hasError: false,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error during creating Blog:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
