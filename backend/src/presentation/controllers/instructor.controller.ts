import { Request, Response } from "express";
import { IGetInstructorUseCase } from "../../application/usecases/instructor/getInstructor/IGetInstructor.usecase";
import { ResponseHelper } from "./helpers/response.helper";


export class InstructorController {
  constructor(
    private readonly _getInstructorUseCase : IGetInstructorUseCase
  ) {}

  async getInstructor(req: Request, res: Response): Promise<void> {
    const _id = req.params._id as string;
    const result = await this._getInstructorUseCase.execute(_id);
    ResponseHelper.success(
      res,
      result.data
      ,
      "Instructor fetched successfully",
      result.statusCode
    );
  }

  
}
