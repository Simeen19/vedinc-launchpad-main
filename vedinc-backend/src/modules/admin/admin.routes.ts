import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { createAdmin, deleteAdmin } from "./admin.controller";
import { listAdmins } from "./admin.controller";
import { listAllUsers } from "./admin.controller";

const router = Router();

router.post(
    "/create-admin",
    authenticate,
    requireRole("SUPER_ADMIN"),
    createAdmin
);

// ✅ NEW: delete admin
router.delete(
    "/users/:id",
    authenticate,
    requireRole("SUPER_ADMIN"),
    deleteAdmin
);
router.get(
    "/users",
    authenticate,
    requireRole("SUPER_ADMIN"),
    listAdmins
);
router.get(
    "/all-users",
    authenticate,
    requireRole("ADMIN"), // ADMIN + SUPER_ADMIN
    listAllUsers
);

export default router;
