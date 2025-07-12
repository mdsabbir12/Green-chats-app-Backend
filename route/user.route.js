import express from "express";
import {getUserProfile, signup,login,logout } from "../Controller/user.controller.js";
import SecureRoute from "../middleware/SecureRoute.js";
const router = express.Router();
router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout)
router.get("/getUserProfile",SecureRoute,getUserProfile); 

export default router;