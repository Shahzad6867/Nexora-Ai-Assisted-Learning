import {Router} from "express"
import { InstitutionFactory } from "../factories/institution.factory"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

const InstitutionController = InstitutionFactory.create()

router.get("/:_id",authMiddleware,InstitutionController.getInstitution.bind(InstitutionController))
router.patch("/:_id",authMiddleware,InstitutionController.updateInstitutionProfile.bind(InstitutionController))
router.post("/instructor/new",authMiddleware,InstitutionController.createInstructor.bind(InstitutionController))



export default router