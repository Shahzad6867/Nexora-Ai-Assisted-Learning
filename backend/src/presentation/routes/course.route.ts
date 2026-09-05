import { Router } from "express";
import { CourseFactory } from "../factories/course.factory";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const CourseController = CourseFactory.create()

router.post("/new",authMiddleware,CourseController.createCourse.bind(CourseController));

export default router;
