import { Router } from "express";
import { CourseFactory } from "../factories/course.factory";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const CourseController = CourseFactory.create()

router.post("/new",authMiddleware,CourseController.createCourse.bind(CourseController));
router.put("/:_id",authMiddleware,CourseController.updateCourse.bind(CourseController));
router.get("/:_id",authMiddleware,CourseController.getCourse.bind(CourseController));

export default router;
