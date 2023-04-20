const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    name: String,
    referral_code: String,
    referral_count: { type: Number, default: 0},
    phone_number: { type: String, sparse: true },
    imei:{type: String},
    username: { type: String, sparse: true, default: "" },
    email: String,
    follower_count: {type: Number, default: 0},
    following_count: {type: Number, default: 0},
    user_can_post:{type: Boolean},
    web_url:{type: String},
    twitter_username:{type: String},
    bio: {type: String, maxLength: 20000},
    auth_type:{
      type: String,
      // lc= local auth; gg=google auth; fb=facebook auth; ap =apple auth
      enum: ["lc", "gg", "fb", "ap"],
    },
    image: String,
    user_type: {
      type: String,
      enum: ["user", "org" ],
    },
    gender: { type: String},
    dob: Date,
    age: Number,
    address: String,
    street: String,
    city: String,
    lga: String,
    country: String,
    platform: String,
    language: {
      type: mongoose.Types.ObjectId,
      ref: "Language",
    },
    notification: { 
      push_notification: {
        type: Boolean,
        default: true,
      },
      SMS: {
        type: Boolean,
        default: true,
      },
      marketing_messages: {
        type: Boolean,
        default: true,
      },
      product_update: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", schema);
