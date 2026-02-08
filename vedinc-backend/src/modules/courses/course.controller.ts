import { Request, Response } from "express";
import { createPdfCourseService, deleteCourseService } from "./course.service";
import { uploadPdfToSupabase } from "../../utils/uploadPdf";
import { listCoursesService } from "./course.service";

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

        // upload to Supabase Storage
        const pdfUrl = await uploadPdfToSupabase(req.file);

        // save in DB
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
export const listPdfCourses = async (_req: Request, res: Response) => {
    try {
        const courses = await listCoursesService();
        return res.json(courses);
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch courses" });
    }
};
export const deletePdfCourseController = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;
    await deleteCourseService(id as string);
    res.json({ message: "PDF course deleted" });
};
