import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
    listPdfCourses,
    getPdfCourseForUserController,
} from "./course.controller";

const router = Router();

// USER: list all courses
router.get(
    "/pdf",
    authenticate,
    listPdfCourses
);

// USER: view/download PDF
router.get(
    "/pdf/:id",
    authenticate,
    getPdfCourseForUserController
);

export default router;
