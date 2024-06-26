const path = require("path");
const Blog = require("../../models/Blog");
const blogValidationSchema = require("../../validators/blogValidationSchema.js");

async function create(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can create Blog",
      });
    }

    if (!req.files.bannerImageUrl || !req.files.contentImageUrl) {
      return res.status(400).json({
        hasError: true,
        message: "Banner image and content image are required",
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
      : null;
    const contentImageUrl = req.files.contentImageUrl
      ? contentImagePath + "/" + req.files.contentImageUrl[0].filename
      : null;

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

    const status = role === "admin" ? "approved" : "pending";
    const createRequest = role !== "admin";

    const newBlog = await Blog.create({
      userId,
      bannerImageUrl,
      contentImageUrl,
      title,
      date,
      summary: formattedSummary,
      status,
      createRequest,
    });

    return res.status(201).json({
      hasError: false,
      message:
        "Blog submitted successfully. The status is " +
        newBlog.status +
        ". You will be notified when it is approved by the Admin.",
      data: newBlog,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A blog post with this title already exists for this user",
      });
    }

    console.error("Error during creating Blog:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
