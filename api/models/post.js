var mongoose = require("mongoose");
const { DateTime } = require("luxon");

let Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 200 },
    content: { type: String, required: true, maxLength: 20000 },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, required: true },
    url: { type: String, required: true, maxLength: 100, default: this._id },
    author: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  { toJSON: { virtuals: true } }
);

// Format the time posted in a way that will render nicely
PostSchema.virtual("dateFormatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Post", PostSchema);
