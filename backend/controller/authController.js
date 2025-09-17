import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
console.log(req.body);
    if (!userName || !email || !password ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }

    const existingUser = await User.findOne({ email});

    if (existingUser) {
      if (existingUser.email === email) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false });
      }
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashpassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "User added successfully",
      success: true,
      User: {
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




const login = async (req, res) => {
  try {
    const {  email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    if (email === user.email && isValidPassword) {
      const token = jwt.sign(
        {
          userName: user.userName,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "120m" }
      );

      // store token in http-Only cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 120 * 60 * 1000,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax", 
      });
      res.json({
        message: "Logged in successfully",
        success: true,
        data: {
          user: {
            userName: user.userName,
            email: user.email,
          },
          token,
        },
        
      });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
    });
    res.status(200).json({ message: 'Token removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export { registerUser, login ,logout};