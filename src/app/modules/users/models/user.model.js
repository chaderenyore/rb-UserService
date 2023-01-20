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
    auth_type:{
      type: String,
      // lc= local auth; gg=google auth; fb=facebook auth; ap =apple auth
      enum: ["lc", "gg", "fb", "ap", "local" ],
    },
    image: String,
    user_type: {
      type: String,
      enum: ["user", "org" ],
    },
    blocked: { type: Boolean, default: false },
    is_boarded: { type: Boolean, default: false },
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
