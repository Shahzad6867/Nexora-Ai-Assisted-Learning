import { Request, Response } from "express";
import { ICreateSubjectUseCase } from "../../application/usecases/subject/createSubject/ICreateSubject.usecase";
import { ResponseHelper } from "./helpers/response.helper";
import { IUpdateSubjectUseCase } from "../../application/usecases/subject/updateSubject/IUpdateSubject.usecase";
import { IGetSubjectsByInstructorIdUseCase } from "../../application/usecases/subject/getSubjectsByInstructorId/IGetSubjectsByInstructorId.usecase";
import { IGetSubjectUseCase } from "../../application/usecases/subject/getSubject/IGetSubject.usecase";

export class SubjectController {
  constructor(
    private readonly _createSubjectUseCase: ICreateSubjectUseCase,
    private readonly _updateSubjectUseCase: IUpdateSubjectUseCase,
    private readonly _getSubjectsByInstructorIdUseCase : IGetSubjectsByInstructorIdUseCase,
    private readonly _getSubjectUseCase : IGetSubjectUseCase
  ) {}

  async createSubject(req: Request, res: Response) {
    const result = await this._createSubjectUseCase.execute(req.body);
    ResponseHelper.success(
      res,
      result.data,
      "Subject created successfully",
      result.statusCode
    );
  }

  async updateSubject(req : Request, res : Response) {
    const _id = req.params._id as string
    const result = await this._updateSubjectUseCase.execute(_id,req.body)
    ResponseHelper.success(
        res,
        result.data,
        "Subject updated successfully",
        result.statusCode
      );
  }

  async getSubjectsByInstructorId(req : Request, res : Response){
    const _id = req.params._id as string
    const result = await this._getSubjectsByInstructorIdUseCase.execute(_id)
    ResponseHelper.success(
        res,
        result.data,
        "Subjects of instructor fetched successfully",
        result.statusCode
      );
  }
  async getSubject(req : Request, res : Response){
    const _id = req.params._id as string
    const result = await this._getSubjectUseCase.execute(_id)
    ResponseHelper.success(
        res,
        result.data,
        "Subject fetched successfully",
        result.statusCode
      );
  }
  
}
