const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const cors = require("cors");

const User = require("../../models/User");
const auth = require("../../middleware/auth");
// const upload = require("../../middleware/multer");

// middle ware
express().use(express.static("public")); //to access the files in public folder
express().use(cors()); // it enables all cors requests

router.post(
  "/register",
    auth, 
  async (req, res) => {
 
    const { name, score, age } = req.body;

    try {
      let user = await User.findOne({ name });

      if (user) { 
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      user = new User({
        name,
        score,
        age
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
    const pageSize = parseInt(req.query.size); 

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize - 1;

    // Slice the users array based on the indexes
    const users = await User.find({});
    const paginatedUsers =
      endIndex >= users.length - 1
        ? users.slice(startIndex, users.length)
        : users.slice(startIndex, endIndex + 1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(users.length / pageSize);

    // Send the paginated users and total pages as the API response
    res.send({ paginatedUsers, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    const id = req.body._id;
    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      score: req.body.score,
      age: req.body.age,
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
    res.json("success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
