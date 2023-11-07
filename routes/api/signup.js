const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const config = require("config");
const { check, validationResult } = require("express-validator");

const Admin = require("../../models/Admin");
const upload = require("../../middleware/multer");

// middle ware
express().use(express.static("public")); //to access the files in public folder
express().use(cors()); // it enables all cors requests

router.post(
  "/signup",

  upload.single("file"),
  async (req, res) => {

    const { name, email, password } = req.body;
    const  photo  = req.file.filename;

    try {
      let admin = await Admin.findOne({ email });

      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "admin already exists" }] });
      }

      admin = new Admin({
        name,
        email,
        password,
        photo
      });

      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      res.send("Registered Successfully!");

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
