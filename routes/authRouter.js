import express from "express"
const authRouter = express.Router();
import { signUp,signIn,tokenValidation,getUser,signInAsAdmin,signUpAsUser } from '../Controllers/authController.js'
import auth from "../middleware/auth.js";
import User from "../Models/userModel.js";

authRouter.post("/api/signUpAsAdmin", signUp)
authRouter.post("/api/signupAsUser", signUpAsUser)
authRouter.post("/api/signinAsUser", signIn)
authRouter.post("/api/signinAdmin", signInAsAdmin)

authRouter.post("/tokenIsValid", tokenValidation)

authRouter.get("/",auth,getUser )

// authRouter.get("/",auth, async (req,res) => {
//   const user = await User.findById(req, res);
//   res.json({ ...user._doc, token: req.token });
// })

export default authRouter;



