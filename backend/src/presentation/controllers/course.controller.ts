import { Request, Response } from "express";
import { ResponseHelper } from "./helpers/response.helper";
import { ICreateCourseUseCase } from "../../application/usecases/course/createCourse/ICreateCourse.usecase";
import { IGetCoursesOfInstituionUseCase } from "../../application/usecases/course/getCoursesOfIntstitution/IGetCoursesOfInstitution.usecase";

export class CourseController {
  constructor(
    private readonly _createCourseUseCase : ICreateCourseUseCase
  ) {}
  async createCourse(req : Request,res : Response) : Promise<void>{
    const result = await this._createCourseUseCase.execute(req.body)
    ResponseHelper.success(res,result.data,"Course created successfully",result.statusCode)
  }
  
}
