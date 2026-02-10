import { Request, Response } from "express";
import {
    createPdfCourseService,
    deletePdfCourseService,
    listCoursesService,
    getPdfCourseForUserService,
} from "./course.service";
import { uploadPdfToSupabase } from "../../utils/uploadPdf";
import { AppError } from "../../utils/error";
import { getSignedPdfUrl } from "../../utils/signedPdf";

/**
 * ADMIN: Create PDF course with upload
 */
export const createPdfCourseWithUpload = async (
    req: Request,
    res: Response
) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !category) {
            return res.status(400).json({
                message: "Title and category are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "PDF file required",
            });
        }

        const pdfUrl = await uploadPdfToSupabase(req.file);

        const course = await createPdfCourseService({
            title,
            description,
            category,
            pdfUrl,
        });

        return res.status(201).json(course);
    } catch (error) {
        console.error("Create PDF course failed:", error);
        return res.status(500).json({
            message: "Failed to create PDF course",
        });
    }
};

/**
 * PUBLIC: List all PDF courses
 */
export const listPdfCourses = async (_req: Request, res: Response) => {
    try {
        const courses = await listCoursesService();
        return res.json(courses);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to fetch courses",
        });
    }
};

/**
 * ADMIN: Delete PDF course
 */
export const deletePdfCourseController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        await deletePdfCourseService(id as string);

        return res.json({
            message: "PDF course deleted",
        });
    } catch (err: any) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                message: err.message,
            });
        }

        console.error(err);
        return res.status(500).json({
            message: "Failed to delete course",
        });
    }
};

/**
 * USER: View / Download a single PDF course (SIGNED URL)
 */
export const getPdfCourseForUserController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        const course = await getPdfCourseForUserService(id as string);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        const signedUrl = await getSignedPdfUrl(course.pdfUrl);

        return res.json({
            id: course.id,
            title: course.title,
            category: course.category,
            description: course.description,
            pdfUrl: signedUrl,
            expiresIn: 300,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to fetch course",
        });
    }
};
