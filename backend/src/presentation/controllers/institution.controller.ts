import { Request, Response } from "express";
import { ResponseHelper } from "./helpers/response.helper";
import { IGetInstitutionProfileUseCase } from "../../application/usecases/institution/getInstitutionProfile/IGetInstitutionProfile.usecase";
import { IUpdateInstitutionProfileUseCase } from "../../application/usecases/institution/updateInstitutionProfileUseCase/IUpdateInstitutionProfile.usecase";
import { ICreateInstructorUseCase } from "../../application/usecases/instructor/createInstructor/ICreateInstructor.usecase";
import { IGetInstructorsOfInstitutionUseCase } from "../../application/usecases/institution/getInstructorsOfInstitution/IGetInstructorsOfInstitution.usecase";
import { IGetCoursesOfInstituionUseCase } from "../../application/usecases/course/getCoursesOfIntstitution/IGetCoursesOfInstitution.usecase";

export class InstitutionController {
  constructor(
    private readonly _getInstitutionProfileUseCase: IGetInstitutionProfileUseCase,
    private readonly _updateInstitutionProfileUseCase: IUpdateInstitutionProfileUseCase,
    private readonly _createInstructorUseCase: ICreateInstructorUseCase,
    private readonly _getInstructorsOfInstitutionUseCase: IGetInstructorsOfInstitutionUseCase,
    private readonly _getCoursesOfInstitutionUseCase : IGetCoursesOfInstituionUseCase
  ) {}

  async getInstitution(req: Request, res: Response): Promise<void> {
    const _id = req.params._id as string;
    const institutionResult = await this._getInstitutionProfileUseCase.execute({
      _id,
    });
    const instructorsResult =
      await this._getInstructorsOfInstitutionUseCase.execute(_id);

    const coursesResult = await this._getCoursesOfInstitutionUseCase.execute(_id)
    ResponseHelper.success(
      res,
      {
        institution: institutionResult.data,
        instructors: instructorsResult.data,
        courses : coursesResult.data
      },
      "Institution, Instructors and Courses fetched successfully",
      institutionResult.statusCode
    );
  }

  async updateInstitutionProfile(req: Request, res: Response): Promise<void> {
    const _id = req.params._id as string;
    const result = await this._updateInstitutionProfileUseCase.execute(
      _id,
      req.body
    );
    ResponseHelper.success(
      res,
      result.data,
      "Institution updated successfully",
      result.statusCode
    );
  }

  async createInstructor(req: Request, res: Response): Promise<void> {
    const result = await this._createInstructorUseCase.execute(req.body);
    ResponseHelper.success(
      res,
      result.data,
      "Instructor created successfully",
      result.statusCode
    );
  }
}
