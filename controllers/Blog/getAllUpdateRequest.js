const Blog = require("../../models/Blog");

async function getAllUpdateRequest(req, res) {
  try {
    const updateRequests = await Blog.find({ updateRequest: true })
      .populate("userId", "userName")
      .select(
        "userId bannerImageUrl contentImageUrl title date summary status createdAt updatedAt"
      )
      .lean();

    if (updateRequests.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No update blog requests found",
      });
    }

    const updatedBlogs = updateRequests.map((blog) => {
      const wordLimit = 50;
      const words = blog.summary.split(" ");
      const limitedSummary =
        words.length > wordLimit
          ? words.slice(0, wordLimit).join(" ") + "..."
          : blog.summary;

      return {
        ...blog,
        userName: blog.userId ? blog.userId.userName : null,
        userId: blog.userId ? blog.userId._id : null,
        summary: limitedSummary,
        bannerImageUrl: "http://localhost:3001" + blog.bannerImageUrl,
        contentImageUrl: "http://localhost:3001" + blog.contentImageUrl,
      };
    });

    return res.status(200).json({
      hasError: false,
      message: "Update blog requests retrieved successfully",
      data: updatedBlogs,
    });
  } catch (error) {
    console.error("Error during retrieving update blog requests:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = getAllUpdateRequest;
