import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//<----------------USER REGISTERATION-------------------->
const register = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if(!name || !password){
        return res.status(400).json({status: false, message: "Please enter all fields"})
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      password: hashPassword,
    });
    const user = await newUser.save();
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return res
        .status(201)
        .json({ token, status: true, message: "User Registered successfully" });
    } else {
      return res.status(400).json({ status: false, message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

//<----------------USER LOGIN-------------------->


  const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
      if(!name || !password){
        return res.status(400).json({status: false, message: "Please enter all fields"})
    }
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).json({ token, status: false, message: "User Logged in successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default {
  register,
  login,
};
