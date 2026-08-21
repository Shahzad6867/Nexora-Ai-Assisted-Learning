import {Router} from "express"
import { RequestFactory } from "../factories/request.factory"

const router = Router()

const RequestController = RequestFactory.create()
router.post("/new",RequestController.createRequest.bind(RequestController))
router.put("/:_id/resubmit",RequestController.updateRequest.bind(RequestController))
router.get("/:_id",RequestController.getRequest.bind(RequestController))

export default router