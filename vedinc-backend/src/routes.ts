import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import { authenticate } from "./middlewares/auth.middleware";
import { requireRole } from "./middlewares/role.middleware";
import courseRoutes from "./modules/courses/course.routes";
import userCourseRoutes from "./modules/courses/user.course.routes";
import adminRoutes from "./modules/admin/admin.routes";
const router = Router();

router.get(
    "/admin/test",
    authenticate,
    requireRole("ADMIN"),
    (_req, res) => {
        res.json({ message: "Admin access granted" });
    }
);

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/user-courses", userCourseRoutes);
router.use("/admin", adminRoutes);


export default router;
