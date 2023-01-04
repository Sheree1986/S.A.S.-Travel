const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
  },
    email: {
    type: String,
  },
    contact: {
    type: String,
  },
});

//export to controllers!!!
module.exports = mongoose.model("user", userSchema);