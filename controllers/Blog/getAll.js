const Blog = require("../../models/Blog");

async function getAll(req, res) {
  try {
    const blogs = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          userName: { $arrayElemAt: ["$user.userName", 0] },
        },
      },
      {
        $project: {
          user: 0,
        },
      },
    ]);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No blogs found",
      });
    }

    for (const blog of blogs) {
      blog.bannerImageUrl = "http://localhost:3001" + blog.bannerImageUrl;
      blog.contentImageUrl = "http://localhost:3001" + blog.contentImageUrl;
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
