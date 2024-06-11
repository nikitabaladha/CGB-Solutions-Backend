// const Blog = require("../../models/Blog");

// async function getAll(req, res) {
//   try {
//     const blogs = await Blog.aggregate([
//       {
//         $match: {
//           status: "approved",
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       {
//         $addFields: {
//           userName: { $arrayElemAt: ["$user.userName", 0] },
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           userId: 1,
//           bannerImageUrl: 1,
//           contentImageUrl: 1,
//           title: 1,
//           date: 1,
//           summary: { $substr: ["$summary", 0, 300] },
//           status: 1,
//           createdAt: 1,
//           updatedAt: 1,
//           userName: 1,
//         },
//       },
//     ]);

//     if (!blogs || blogs.length === 0) {
//       return res.status(404).json({
//         hasError: true,
//         message: "No blogs found",
//       });
//     }

//     for (const blog of blogs) {
//       blog.bannerImageUrl = "http://localhost:3001" + blog.bannerImageUrl;
//       blog.contentImageUrl = "http://localhost:3001" + blog.contentImageUrl;
//     }

//     return res.status(200).json({
//       hasError: false,
//       message: "Blogs retrieved successfully",
//       data: blogs,
//     });
//   } catch (error) {
//     console.error("Error during retrieving blogs:", error);

//     return res.status(500).json({
//       hasError: true,
//       message: "Internal Server Error",
//     });
//   }
// }

// module.exports = getAll;

const Blog = require("../../models/Blog");

async function getAll(req, res) {
  try {
    const blogs = await Blog.find({ status: "approved" })
      .populate("userId", "userName")
      .select(
        "userId bannerImageUrl contentImageUrl title date summary status createdAt updatedAt"
      )
      .lean();

    if (!blogs.length) {
      return res.status(404).json({
        hasError: true,
        message: "No blogs found",
      });
    }

    const updatedBlogs = blogs.map((blog) => ({
      ...blog,
      userName: blog.userId ? blog.userId.userName : null,
      userId: blog.userId ? blog.userId._id : null,
      summary: blog.summary.substring(0, 300),
      bannerImageUrl: "http://localhost:3001" + blog.bannerImageUrl,
      contentImageUrl: "http://localhost:3001" + blog.contentImageUrl,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Blogs retrieved successfully",
      data: updatedBlogs,
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
