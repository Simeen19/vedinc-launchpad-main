import prisma from "../../lib/prisma";
import { deletePdfFromSupabase } from "../../utils/deletePdfs";
import { NotFoundError } from "../../utils/error";

export const createCourse = (data: {
  title: string;
  category: string;
  description?: string;
  pdfUrl: string;
}) => {
  return prisma.pdfCourse.create({
    data: {
      title: data.title,
      category: data.category,
      description: data.description || "",
      pdfUrl: data.pdfUrl,
    },
  });
};

export const getAllCourses = () => {
  return prisma.pdfCourse.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getCourseById = (id: string) => {
  return prisma.pdfCourse.findUnique({
    where: { id },
  });
};

export const deleteCourseById = async (id: string) => {
  const course = await prisma.pdfCourse.findUnique({
    where: { id },
  });

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  // 🔥 DELETE FILE FIRST
  await deletePdfFromSupabase(course.pdfUrl);

  // ✅ THEN delete DB row
  await prisma.pdfCourse.delete({
    where: { id },
  });

  return { success: true };
};
