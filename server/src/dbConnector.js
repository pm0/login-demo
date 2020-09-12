const mongoose = require("mongoose");
const encrypt = require("./encryptManager");

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
    const hash = encrypt.hashPassword(password);
    try {
      const user = await User.create({ name, email, password: hash });
      return { status: "ok" };
    } catch (error) {
      return { status: "error", error };
    }
  },
  getUserByEmail: async function(email) {
    const users = await User.find({ email });
    if (users.length === 1) {
      return users[0];
    } else {
      return null;
    }
  },
  getUsersList: async function() {
    const users = await User.find({}).select("name email");
    return users.map(user => ({ name: user.name, email: user.email }));
  }
};
