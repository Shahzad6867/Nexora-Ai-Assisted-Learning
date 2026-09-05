import {Router} from "express"
import { RequestFactory } from "../factories/request.factory"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

const RequestController = RequestFactory.create()
router.post("/new",authMiddleware,RequestController.createRequest.bind(RequestController))
router.put("/:_id/resubmit",authMiddleware,RequestController.updateRequest.bind(RequestController))
router.get("/:_id",authMiddleware,RequestController.getRequest.bind(RequestController))

export default router