import prisma from "../../lib/prisma";

export const createCourse = (
    title: string,
    category: string,
    description: string | "",
    pdfUrl: string
) => {
    return prisma.pdfCourse.create({
        data: {
            title,
            category,
            description,
            pdfUrl,
        },
    });
};

export const getAllCourses = () => {
    return prisma.pdfCourse.findMany({
        orderBy: { createdAt: "desc" },
    });
};

export const deleteCourseById = (id: string) => {
    return prisma.pdfCourse.delete({
        where: { id },
    });
};
