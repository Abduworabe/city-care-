import { Router } from "express";
const router = Router();
// ⭐️ IMPORT: Rate Limiter ⭐️
import rateLimiter from "express-rate-limit";

import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

// ⭐️ Rate Limiter Configuration ⭐️
const apiLimiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // 50 requests per minute per IP
  message: { msg: "Too many requests, please try again in a minute." },
});
// -----------------------------------

// ⭐️ Apply rate limiter middleware ⭐️
router.post("/register", apiLimiter, validateRegisterInput, register);

router.post("/login", apiLimiter, validateLoginInput, login);

router.get("/logout", logout);

export default router;
