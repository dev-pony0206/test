const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const cors = require("cors");

const User = require("../../models/User");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/multer");

// middle ware
express().use(express.static("public")); //to access the files in public folder
express().use(cors()); // it enables all cors requests

router.post(
  "/register",
  [
    auth,
    check("email", "Please include a valid email").isEmail(),
    check("name", "Name is required").exists(),
    check("gender", "Gender must be selected").exists(),
    check("age", "Age is required").exists()
  ],
  upload.single("file"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, gender, age } = req.body;
    const { photo } = req.file;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      user = new User({
        name,
        email,
        gender,
        age,
        photo
      });

      await user.save();

      res.send("Registered Successfully!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/list", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    // Slice the users array based on the indexes
    const users = await User.find(filter);
    const paginatedUsers = users.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / pageSize);

    // Send the paginated users and total pages as the API response
    res.send({ users: paginatedUsers, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/update", auth, upload.single("file"), async (req, res) => {
  try {
    const id = req.body.id;

    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      photo: req.file.filename,
      date_u: Date.now()
    });

    res.json("success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/delete", auth, async (req, res) => {
  try {
    const id = req.body.id;
    await User.findByIdAndDelete(id);
    res.send("success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
