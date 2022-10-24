const mongoose = require("mongoose");
const validator = require("validator");
const bcrytp = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://i.postimg.cc/tRkqHYX2/Screenshot-10.png",
  },
  bio: {
    type: String,
    default: "Hello There",
  },
  theme: {
    type: String,
    default: 'light',
  },
});

// register static method
userSchema.statics.register = async function (
  firstname,
  lastname,
  email,
  password,
  avatar,
  bio,
  theme
) {
  if (!firstname || !lastname || !email || !password) {
    throw Error("All fields must be filled..");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email..");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must contain letters, numbers and special characters..");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User already exists");
  }

  const salt = await bcrytp.genSalt(10);
  const hash = await bcrytp.hash(password, salt);

  const user = await this.create({
    firstname,
    lastname,
    email,
    password: hash,
    avatar,
    bio,
    theme,
  });

  return user;
};

// login static method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled..");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email..");
  }
  const match = await bcrytp.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
