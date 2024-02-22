import express from "express";
import bcryptjs from "bcryptjs";
import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with the provided email doesn't exist." });
    }

    const isPassMatch = await bcryptjs.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({ msg: "Incorrect Password or email." });
    }
    if (user.type === "user") {
      const token = jwt.sign({ id: user._id }, "passwordKey");
      res.json({ token, ...user._doc });
    }
    else{
      res.status(400).json({ error: `Invalid User Type!: ${error.message}` });
    }
  } catch (error) {
    res.status(500).json({ error: `Error on Singin: ${error.message}` });
  }
};
export const signInAsAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with the provided email doesn't exist." });
    }

    const isPassMatch = await bcryptjs.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({ msg: "Incorrect Password or email." });
    }
    if (user.type === "Admin") {
      const token = jwt.sign({ id: user._id }, "passwordKey");
      res.json({ token, ...user._doc });
    }
    else{
      res.status(400).json({ error: `Invalid User Type!: ${error.message}` });
    }
  } catch (error) {
    res.status(500).json({ error: `Error on Singin: ${error.message}` });
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password, type = "Admin" } = req.body;

    const isExisted = await User.findOne({ email });

    if (isExisted) {
      return res.status(400).json({ msg: "User Already exists!." });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
      type,
    });

    user = await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const tokenValidation = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
};
