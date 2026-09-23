import { Router } from "express";
const router = Router();
import upload from "../middleware/multerMiddleware.js";

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [authorizePermissions("admin"), getApplicationStats]);
router.get("/admin/all-users", [authorizePermissions("admin"), getAllUsers]);
router.patch("/update-user", checkForTestUser, upload.single("avatar"), validateUpdateUserInput, updateUser);
export default router;
