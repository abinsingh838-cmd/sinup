import signUp from "../controllers/authcontroller.js";
import express from "express";

const router = express.Router();

router.post("/sign-up", signUp);

export default router;