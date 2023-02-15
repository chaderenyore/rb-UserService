const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    follower_id: String,
    follower_username: String,
    follower_firstname: String,
    follower_image_url:{type: String},
    follower_type: {
      type: String,
      enum: ["user", "org" ],
    },
    follower_owner_id: String,
    following_username: String,
    following_firstname: String,
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

module.exports = mongoose.model("Follower", schema);
