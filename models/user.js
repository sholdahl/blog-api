var mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 200 },
  lastName: { type: String, required: true, maxLength: 200 },
  email: { type: String, required: true, maxLength: 200 },
  password: { type: String, required: true, maxLength: 100 },
});

module.exports = mongoose.model("Category", UserSchema);