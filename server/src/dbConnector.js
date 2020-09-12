const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  addUser: async function(name, email, password) {
    const hash = bcrypt.hashSync(password, 10);
    try {
      const user = await User.create({ name, email, password: hash });
      return { status: "ok" };
    } catch (error) {
      return { status: "error", error };
    }
  },
  getUserByEmail: async function(email) {
    const user = await User.find({ email });
    return user;
  },
  getUsersList: async function() {
    const users = await User.find({}).select("name email");
    return users.map(user => ({ name: user.name, email: user.email }));
  }
};
