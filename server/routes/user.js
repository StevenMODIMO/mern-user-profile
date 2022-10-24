const {
  registerUser,
  loginUser,
  getUser,
  updateCredentials,
  deleteUser,
} = require("../controllers/userControllers");
const router = require("express").Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").get(getUser);
router.route("/update/:id").post(updateCredentials);
router.route("/delete/:id").delete(deleteUser);

module.exports = router;
