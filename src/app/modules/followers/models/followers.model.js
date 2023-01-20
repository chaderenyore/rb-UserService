const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    follower_id: String,
    user_id: String,
    org_id: String,
    follower_type: {
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
