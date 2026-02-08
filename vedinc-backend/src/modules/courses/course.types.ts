// src/modules/courses/course.types.ts
export type CreateCourseInput = {
    title: string;
    category: string;
    pdfUrl: string;
    description?: string;
};
