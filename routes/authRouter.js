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
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 requests per windowMs
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});
// -----------------------------------

// ⭐️ Apply rate limiter middleware ⭐️
router.post("/register", apiLimiter, validateRegisterInput, register);

router.post("/login", apiLimiter, validateLoginInput, login);

router.get("/logout", logout);

export default router;
