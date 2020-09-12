const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);

module.exports = {
  getUserByEmail: async function(email) {
    const user = await User.find({ email });
    return user;
  },
  getUsersList: async function() {
    const users = await User.find({}).select("name email");
    return users.map(user => ({ name: user.name, email: user.email }));
  }
};
