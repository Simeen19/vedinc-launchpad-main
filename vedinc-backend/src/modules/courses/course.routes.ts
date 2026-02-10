import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { uploadPdf } from "../../middlewares/upload.middleware";
import {
    createPdfCourseWithUpload,
    listPdfCourses,
    deletePdfCourseController,
    getPdfCourseForUserController,
} from "./course.controller";

const router = Router();

// ADMIN: upload PDF course
router.post(
    "/admin/pdf",
    authenticate,
    requireRole("ADMIN"),
    uploadPdf.single("pdf"),
    createPdfCourseWithUpload
);

// PUBLIC: list PDF courses
router.get("/pdf", listPdfCourses);

// USER: view/download single PDF
router.get(
    "/pdf/:id",
    authenticate,
    getPdfCourseForUserController
);

// ADMIN: delete PDF course
router.delete(
    "/pdf/:id",
    authenticate,
    requireRole("ADMIN"),
    deletePdfCourseController
);

export default router;
