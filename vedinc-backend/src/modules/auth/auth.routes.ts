import { Router } from "express";
import { login, signup } from "./auth.controller";

const router = Router();

router.post("/login", login);
router.post("/signup", signup); // ✅ added

export default router;
