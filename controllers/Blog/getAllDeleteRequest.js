const Blog = require("../../models/Blog");

async function getAllDeleteRequest(req, res) {
  try {
    const deleteRequests = await Blog.find({ deleteRequest: true })
      .populate("userId", "userName")
      .select(
        "userId bannerImageUrl contentImageUrl title date summary status createdAt updatedAt"
      )
      .lean();

    if (deleteRequests.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No delete blog requests found",
      });
    }

    const updatedBlogs = deleteRequests.map((blog) => {
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
        bannerImageUrl: blog.bannerImageUrl
          ? `http://localhost:3001${blog.bannerImageUrl}`
          : null,
        contentImageUrl: blog.contentImageUrl
          ? `http://localhost:3001${blog.contentImageUrl}`
          : null,
      };
    });

    return res.status(200).json({
      hasError: false,
      message: "Delete blog requests retrieved successfully",
      data: updatedBlogs,
    });
  } catch (error) {
    console.error("Error during retrieving delete blog requests:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = getAllDeleteRequest;
