import express from "express"
const authRouter = express.Router();
import { signUp,signIn,tokenValidation,getUser } from '../Controllers/authController.js'
import auth from "../middleware/auth.js";
import User from "../Models/userModel.js";

authRouter.post("/api/signup", signUp)
authRouter.post("/api/signin", signIn)

authRouter.post("/tokenIsValid", tokenValidation)

authRouter.get("/",auth,getUser )

// authRouter.get("/",auth, async (req,res) => {
//   const user = await User.findById(req, res);
//   res.json({ ...user._doc, token: req.token });
// })

export default authRouter;


// import express from 'express'
// import bcryptjs from 'bcryptjs'
// import User from "../Models/userModel.js"
// import jwt from "jsonwebtoken"
// import auth from "../middleware/auth.js"
// const authRouter = express.Router();

// authRouter.post("/api/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const isExisted = await User.findOne({ email });

//     if (isExisted) {
//       return res.status(400).json({ msg: "User Already exists!." });
//     }

//     const hashedPassword = await bcryptjs.hash(password, 8);

//     let user = new User({
//       email,
//       password: hashedPassword,
//       name,
//     });

//     user = await user.save();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// authRouter.post("/api/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ msg: "User with the provided email doesn't exist." });
//     }

//     const isPassMatch = await bcryptjs.compare(password, user.password);
//     if (!isPassMatch) {
//       return res.status(400).json({ msg: "Incorrect Password or email." });
//     }

//     const token = jwt.sign({ id: user._id }, "passwordKey");
//     res.json({ token, ...user._doc });
//   } catch (error) {
//     res.status(500).json({ error: `Error on Singin: ${error.message}` });
//   }
// });

// //? => Check if the token is valid
// authRouter.post("/tokenIsValid", async (req, res) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) return res.json(false);
//     const verified = jwt.verify(token, "passwordKey");
//     if (!verified) return res.json(false);

//     const user = await User.findById(verified.id);
//     if (!user) return res.json(false);

//     return res.json(true);
//   } catch (e) {}
// });

// //?: => Get user data
// authRouter.get("/", auth, async (req, res) => {
//   const user = await User.findById(req, res);
//   res.json({ ...user._doc, token: req.token });
// });

// export default authRouter;
