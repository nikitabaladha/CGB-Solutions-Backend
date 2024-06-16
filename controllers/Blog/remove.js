// const Blog = require("../../models/Blog");

// async function remove(req, res) {
//   try {
//     const userId = req.user.id;
//     const blogId = req.params.id;

//     if (!userId) {
//       return res.status(403).json({
//         hasError: true,
//         message: "Forbidden: Only logged-in users can delete blogs",
//       });
//     }

//     if (!blogId) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Blog ID is required",
//       });
//     }

//     const blog = await Blog.findOne({ _id: blogId, userId: userId });

//     if (!blog) {
//       return res.status(404).json({
//         hasError: true,
//         message: "Blog not found",
//       });
//     }

//     await Blog.findByIdAndDelete(blogId);

//     return res.status(200).json({
//       hasError: false,
//       message: "Blog deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error during deleting Blog:", error);

//     return res.status(500).json({
//       hasError: true,
//       message: "Internal Server Error",
//     });
//   }
// }

// module.exports = remove;

// ==================== =================================================================

const path = require("path");
const Blog = require("../../models/Blog");
const blogValidationSchema = require("../../validators/blogValidationSchema.js");

async function remove(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const blogId = req.params.id;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can delete Blog",
      });
    }

    const status = role === "admin" ? "approved" : "pending";
    const deleteRequest = role !== "admin";

    const blog = await Blog.findOne({ _id: blogId, userId: userId });

    if (!blog) {
      return res.status(404).json({
        hasError: true,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(201).json({
      hasError: false,
      message:
        "Blog is deleted successfully. The status is " +
        newBlog.status +
        ". You will be notified when it is approved by the Admin.",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error during deleting Blog:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = remove;
