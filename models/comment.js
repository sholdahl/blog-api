var mongoose = require("mongoose");
const { DateTime } = require("luxon");

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
  comment: { type: String, required: true, maxLength: 2000 },
  author: { type: String, required: true, maxlength: 100 },
  date: { type: Date, default: Date.now },
  post: [{ type: Schema.Types.ObjectId, ref: "post", required: true }],
});

// Format the time posted in a way that will render nicely
CommentSchema.virtual("dateFormatted").get(function () {
  return DateTime.fromJSDate(this.timePosted).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", CommentSchema);
