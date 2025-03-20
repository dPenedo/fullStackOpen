const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

blogSchema.set("toJson", {
  virtuals: true,
});

module.exports = mongoose.model("Blog", blogSchema);
