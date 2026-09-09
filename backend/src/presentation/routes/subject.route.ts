import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { SubjectFactory } from "../factories/subject.factory";

const router = Router();
const SubjectController = SubjectFactory.create();
router.post(
  "/new",
  authMiddleware,
  SubjectController.createSubject.bind(SubjectController)
);

router.put(
  "/:_id",
  authMiddleware,
  SubjectController.updateSubject.bind(SubjectController)
);

router.get(
  "/instructor/:_id",
  authMiddleware,
  SubjectController.getSubjectsByInstructorId.bind(SubjectController)
);

router.get(
    "/:_id",
    authMiddleware,
    SubjectController.getSubject.bind(SubjectController));

export default router;
