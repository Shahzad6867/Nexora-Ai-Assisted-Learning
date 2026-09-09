import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { InstructorFactory } from "../factories/instructor.factory";

const router = Router();
const InstructorController = InstructorFactory.create();
router.get("/:_id",authMiddleware,InstructorController.getInstructor.bind(InstructorController))

export default router;
