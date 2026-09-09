import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ChapterFactory } from "../factories/chapter.factory";

const router = Router();

const ChapterController = ChapterFactory.create()

router.post("/new",authMiddleware,ChapterController.createChapter.bind(ChapterController))
router.delete("/:_id",authMiddleware,ChapterController.deleteChapter.bind(ChapterController))
router.get("/:_id",authMiddleware,ChapterController.getChapter.bind(ChapterController))
router.put("/:_id",authMiddleware,ChapterController.updateChapter.bind(ChapterController))

export default router;
