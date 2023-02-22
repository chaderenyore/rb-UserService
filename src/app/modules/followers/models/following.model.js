const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    follower_id: String,
    following_id: String,
    following_username: String,
    following_firstname: String,
    following_lastname: String,
    following_image_url:{type: String},
    following_type: {
      type: String,
      enum: ["user", "org" ],
    },
    blocked: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Following", schema);
