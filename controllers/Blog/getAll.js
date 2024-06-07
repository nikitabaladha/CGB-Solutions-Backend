const Blog = require("../../models/Blog");

async function getAll(req, res) {
  try {
    const blogs = await Blog.find();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No blogs found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error during retrieving blogs:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = getAll;
