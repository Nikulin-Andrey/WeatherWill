const { Router } = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/Users");

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    // console.log(email, password, user)

    if (!(user && user.password === password)) {
      const newUser = new User({ email, password, role: 'ADMIN'})
      try {
      await newUser.save()
      return res.status(201).json({ message: "создан" });

      } catch{
        return res.status(400).json({ message: "неверный логин или пароль" });

      }

    }

    const token = jwt.sign(
      { userId: user.id },
      config.get("jwtKey"), 
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user.id });
    
  } catch(e) {
    res.status(500).json({ message: "что-то пошло не так" });
    console.log(e);
  }
});

module.exports = router;
