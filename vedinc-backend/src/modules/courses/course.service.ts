import * as repo from "./pdf.repo";
import { CreateCourseInput } from "./course.types";

export const createPdfCourseService = (input: CreateCourseInput) => {
    return repo.createCourse(input);
};

export const listCoursesService = () => {
    return repo.getAllCourses();
};

export const deletePdfCourseService = (id: string) => {
    return repo.deleteCourseById(id);
};

export const getPdfCourseForUserService = (id: string) => {
    return repo.getCourseById(id);
};
