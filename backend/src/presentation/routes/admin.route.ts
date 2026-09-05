import { Router } from "express";
import { AdminFactory } from "../factories/admin.factory";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

const AdminController = AdminFactory.create()
router.get("/institutions",authMiddleware,AdminController.getInstitutions.bind(AdminController))
router.get("/institutions/:_id",authMiddleware,AdminController.getInstitution.bind(AdminController))
router.put("/requests/:_id",authMiddleware,AdminController.updateRequestStatus.bind(AdminController))
router.get("/requests",authMiddleware,AdminController.getRequests.bind(AdminController))
router.get("/students",authMiddleware,AdminController.getStudents.bind(AdminController))
router.get("/instructors",authMiddleware,AdminController.getInstructors.bind(AdminController))
router.put("/update/is-blocked",authMiddleware,AdminController.updateIsBlockedEntity.bind(AdminController))

export default router;
