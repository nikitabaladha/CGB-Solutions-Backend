// const path = require("path");
// const Blog = require("../../models/Blog");
// const blogValidationSchema = require("../../validators/blogValidationSchema.js");

// async function update(req, res) {
//   try {
//     const userId = req.user.id;
//     const blogId = req.params.id;

//     if (!userId) {
//       return res.status(403).json({
//         hasError: true,
//         message: "Forbidden: Only logged-in users can update Blog",
//       });
//     }

//     const existingBlog = await Blog.findById(blogId);

//     if (!existingBlog) {
//       return res.status(404).json({
//         hasError: true,
//         message: "Blog not found",
//       });
//     }

//     if (existingBlog.userId.toString() !== userId) {
//       return res.status(403).json({
//         hasError: true,
//         message: "Forbidden: You can only update your own blogs",
//       });
//     }

//     const bannerPath = "/bannerImage/images";
//     const contentImagePath = "/contentImage/images";

//     const { title, date, summary } = req.body;

//     const isEmptySummary =
//       !summary || summary.trim() === "" || summary === "<p><br></p>";

//     if (isEmptySummary) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Summary is required",
//       });
//     }

//     const formattedSummary = summary.replace(/\r?\n/g, "<br>");

//     const bannerImageUrl = req.files.bannerImageUrl
//       ? bannerPath + "/" + req.files.bannerImageUrl[0].filename
//       : existingBlog.bannerImageUrl;
//     const contentImageUrl = req.files.contentImageUrl
//       ? contentImagePath + "/" + req.files.contentImageUrl[0].filename
//       : existingBlog.contentImageUrl;

//     const { error } = blogValidationSchema.validate({
//       title,
//       date,
//       summary,
//     });

//     if (error?.details?.length) {
//       const errorMessages = error.details[0].message;
//       return res.status(400).json({
//         hasError: true,
//         message: errorMessages,
//       });
//     }

//     existingBlog.title = title;
//     existingBlog.date = date;
//     existingBlog.summary = formattedSummary;
//     existingBlog.bannerImageUrl = bannerImageUrl;
//     existingBlog.contentImageUrl = contentImageUrl;

//     await existingBlog.save();

//     return res.status(200).json({
//       hasError: false,
//       message: "Blog updated successfully",
//       data: existingBlog,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(400).json({
//         hasError: true,
//         message: "A blog post with this title already exists for this user",
//       });
//     }

//     console.error("Error during updating Blog:", error);
//     return res.status(500).json({
//       hasError: true,
//       message: "Internal Server Error",
//     });
//   }
// }

// module.exports = update;

// =================================================================

const path = require("path");
const Blog = require("../../models/Blog");
const blogValidationSchema = require("../../validators/blogValidationSchema.js");

async function update(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const blogId = req.params.id;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can update Blog",
      });
    }

    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
      return res.status(404).json({
        hasError: true,
        message: "Blog not found",
      });
    }

    if (existingBlog.userId.toString() !== userId && role !== "admin") {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: You can only update your own blogs",
      });
    }

    const bannerPath = "/bannerImage/images";
    const contentImagePath = "/contentImage/images";

    const { title, date, summary } = req.body;

    const isEmptySummary =
      !summary || summary.trim() === "" || summary === "<p><br></p>";

    if (isEmptySummary) {
      return res.status(400).json({
        hasError: true,
        message: "Summary is required",
      });
    }

    const formattedSummary = summary.replace(/\r?\n/g, "<br>");

    const bannerImageUrl = req.files.bannerImageUrl
      ? bannerPath + "/" + req.files.bannerImageUrl[0].filename
      : existingBlog.bannerImageUrl;
    const contentImageUrl = req.files.contentImageUrl
      ? contentImagePath + "/" + req.files.contentImageUrl[0].filename
      : existingBlog.contentImageUrl;

    const { error } = blogValidationSchema.validate({
      title,
      date,
      summary,
    });

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({
        hasError: true,
        message: errorMessages,
      });
    }

    // If subadmin, mark for update request
    if (role === "subadmin") {
      existingBlog.updateRequest = true;
      existingBlog.proposedChanges = {
        title,
        date,
        summary: formattedSummary,
        bannerImageUrl,
        contentImageUrl,
      };
      existingBlog.status = "pending";
    } else {
      existingBlog.title = title;
      existingBlog.date = date;
      existingBlog.summary = formattedSummary;
      existingBlog.bannerImageUrl = bannerImageUrl;
      existingBlog.contentImageUrl = contentImageUrl;
      existingBlog.updateRequest = false;
      existingBlog.proposedChanges = {};
    }

    await existingBlog.save();

    return res.status(200).json({
      hasError: false,
      message: "Blog update request submitted successfully",
      data: existingBlog,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A blog post with this title already exists for this user",
      });
    }

    console.error("Error during updating Blog:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = update;
