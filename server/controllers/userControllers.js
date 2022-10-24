require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// register new user
const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, avatar, bio, theme } = req.body;

  try {
    const user = await User.register(
      firstname,
      lastname,
      email,
      password,
      avatar,
      bio,
      theme
    );
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async(req ,res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}

// get registered user with id
const getUser = async (req, res) => {
  const { id } = ObjectId(req.params.id);
  try {
    const user = await User.find({ id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// update user credentials
const updateCredentials = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password, avatar, bio, theme } = req.body;
  try {
    const updated = await User.findOneAndUpdate(id, {
      firstname,
      lastname,
      email,
      password,
      avatar,
      bio,
      theme,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json(error);
  }
};
// delete user account with id
const deleteUser = async (req, res) => {
  const { id } = req.params.id;
  try {
    const deleted = await User.findOneAndDelete(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { registerUser, loginUser, getUser, updateCredentials, deleteUser };
