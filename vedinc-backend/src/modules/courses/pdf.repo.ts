import prisma from "../../lib/prisma";
import { CreateCourseInput } from "./course.types";

export const createCourse = (data: CreateCourseInput) => {
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

export const deleteCourseById = (id: string) => {
  return prisma.pdfCourse.delete({
    where: { id },
  });
};