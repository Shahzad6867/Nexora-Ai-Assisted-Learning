import {Router} from "express"
import { InstitutionFactory } from "../factories/institution.factory"

const router = Router()

const InstitutionController = InstitutionFactory.create()

router.get("/:_id",InstitutionController.getInstitution.bind(InstitutionController))
router.patch("/:_id",InstitutionController.updateInstitutionProfile.bind(InstitutionController))
router.post("/instructor/new",InstitutionController.createInstructor.bind(InstitutionController))


export default router