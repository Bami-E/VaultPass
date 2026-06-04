const User= require("../models/users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp =async (req, res)=>{
    const {fullName, email, password, role } = req.body;
    try{
        if (!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

    const user = await User.findOne({ email });
    if (user){
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
          fullName,
          email,
          password: hashedPassword,
          role
        });

     // Do not return the password in the response
    const userResponse = {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
        };
        return res.status(201).json({ message: "User created successfully", user: userResponse });
}
    catch(e){
        console.log(e);
    return res.status(500).json({ message: "Internal server error" });
    }
};



const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({
        message: "Account locked. Try again later."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!isMatch) {
      if (!user.firstFailedAttempt) {
        user.firstFailedAttempt = Date.now();
      }

      const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

      if (user.firstFailedAttempt < tenMinutesAgo) {
        user.loginAttempts = 0;
        user.firstFailedAttempt = Date.now();
      }

      user.loginAttempts += 1;

      if (user.loginAttempts >= 5) {
        user.lockUntil =
          Date.now() + 15 * 60 * 1000; // 15 minutes lock

        user.loginAttempts = 0;
      }

      await user.save();

      return res.status(400).json({
        message: "Invalid credentials"
      });
    }


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: token,
      role: user.role,
    };

    return res
      .status(200)
      .json({ message: "User signed in successfully", userResponse });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    signUp,
    signIn}
    ;
