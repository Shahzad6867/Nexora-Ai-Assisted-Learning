import { Request, Response } from "express";
import { ResponseHelper } from "./helpers/response.helper";
import { ICreateChapterUseCase } from "../../application/usecases/chapter/createChapter/ICreateChapter.usecase";
import { IDeleteChapterUseCase } from "../../application/usecases/chapter/deleteChapter/IDeleteChapter.usecase";
import { IGetChapterUseCase } from "../../application/usecases/chapter/getChapter/IGetChapter.usecase";
import { IEditChapterUseCase } from "../../application/usecases/chapter/editChapter/IEditChapter.usecase";

export class ChapterController {
  constructor(
    private readonly _createChapterUseCase: ICreateChapterUseCase,
    private readonly _deleteChapterUseCase: IDeleteChapterUseCase,
    private readonly _getChapterUseCase: IGetChapterUseCase,
    private readonly _editChapterUseCase: IEditChapterUseCase,
  ) {}

  async createChapter(req: Request, res: Response) {
    const result = await this._createChapterUseCase.execute(req.body);
    ResponseHelper.success(
      res,
      result.data,
      "Chapter created successfully",
      result.statusCode
    );
  }

  async deleteChapter(req: Request, res: Response) {
    const _id = req.params._id as string
    const result = await this._deleteChapterUseCase.execute(_id);
    ResponseHelper.success(
      res,
      result.data,
      "Chapter deleted successfully",
      result.statusCode
    );
  }

  async getChapter(req: Request, res: Response) {
    const _id = req.params._id as string
    const result = await this._getChapterUseCase.execute(_id);
    ResponseHelper.success(
      res,
      result.data,
      "Chapter fetched successfully",
      result.statusCode
    );
  }

  async updateChapter(req: Request, res: Response) {
    const _id = req.params._id as string
    const result = await this._editChapterUseCase.execute(_id,req.body);
    ResponseHelper.success(
      res,
      result.data,
      "Chapter updated successfully",
      result.statusCode
    );
  }
  
  
}
