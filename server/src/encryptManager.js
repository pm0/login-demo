const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = {
  hashPassword: function(password) {
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);
    return hash;
  },
  verifyPassword: function(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
};
