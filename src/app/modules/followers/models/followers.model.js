const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    follower_id: String,
    follower_username: String,
    follower_firstname: String,
    follower_lastname: String,
    follower_image_url:{type: String},
    follower_type: {
      type: String,
      enum: ["user", "org" ],
    },
    following_id: String,
    blocked: { type: Boolean, default: false },

  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Follower", schema);
