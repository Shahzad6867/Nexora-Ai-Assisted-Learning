import { Router } from "express";
import { AdminFactory } from "../factories/admin.factory";

const router = Router()

const AdminController = AdminFactory.create()
router.get("/institutions",AdminController.getInstitutions.bind(AdminController))
router.get("/institutions/:_id",AdminController.getInstitution.bind(AdminController))
router.put("/requests/:_id",AdminController.updateRequestStatus.bind(AdminController))
router.get("/requests",AdminController.getRequests.bind(AdminController))
router.get("/students",AdminController.getStudents.bind(AdminController))
router.get("/instructors",AdminController.getInstructors.bind(AdminController))

export default router;
