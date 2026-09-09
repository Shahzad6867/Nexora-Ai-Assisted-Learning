import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ModuleFactory } from "../factories/module.factory";

const router = Router();

const ModuleController = ModuleFactory.create()

router.post("/new",authMiddleware,ModuleController.createModule.bind(ModuleController));
router.put("/:_id",authMiddleware,ModuleController.updateModule.bind(ModuleController));
router.delete("/:_id",authMiddleware,ModuleController.deleteModule.bind(ModuleController));
router.get("/:_id",authMiddleware,ModuleController.getModule.bind(ModuleController))

export default router;
