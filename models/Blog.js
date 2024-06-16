// // models/Blog.js

// const mongoose = require("mongoose");

// const BlogSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       index: true,
//     },
//     bannerImageUrl: {
//       type: String,
//       required: true,
//     },
//     contentImageUrl: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     summary: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// BlogSchema.index({ userId: 1, title: 1 }, { unique: true });

// const Blog = mongoose.model("Blog", BlogSchema);

// module.exports = Blog;

// =================================================================

const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    bannerImageUrl: {
      type: String,
      required: true,
    },
    contentImageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
    createRequest: {
      type: Boolean,
      default: false,
    },
    updateRequest: {
      type: Boolean,
      default: false,
    },
    deleteRequest: {
      type: Boolean,
      default: false,
    },
    proposedChanges: {
      title: String,
      date: Date,
      summary: String,
      bannerImageUrl: String,
      contentImageUrl: String,
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.index({ userId: 1, title: 1 }, { unique: true });

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
