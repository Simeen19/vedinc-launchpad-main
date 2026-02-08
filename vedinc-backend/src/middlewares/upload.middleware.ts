import multer from "multer";
import { Request } from "express";

export const uploadPdf = multer({
    storage: multer.memoryStorage(),

    fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files allowed"));
        }

        cb(null, true);
    },

    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
});
