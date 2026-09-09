import { Request, Response } from "express";
import { ResponseHelper } from "./helpers/response.helper";
import { ICreateCourseUseCase } from "../../application/usecases/course/createCourse/ICreateCourse.usecase";
import { IGetCourseUseCase } from "../../application/usecases/course/getCourse/IGetCourse.usecase";
import { IGetModulesByCourseIdUseCase } from "../../application/usecases/module/getModulesByCourseId/IGetModulesByCourseId.usecase";
import { GetCourseResponseDTO } from "../../application/dtos/course.dto";
import { IUpdateCourseUseCase } from "../../application/usecases/course/updateCourse/IUpdateCourse.usecase";
import { IGetSubjectsByModuleId } from "../../application/usecases/subject/getSubjectsByModuleId/IGetSubjectsByModuleId.usecase";

export class CourseController {
  constructor(
    private readonly _createCourseUseCase : ICreateCourseUseCase,
    private readonly _getCourseUseCase : IGetCourseUseCase,
    private readonly _updateCourseUseCase : IUpdateCourseUseCase,
  ) {}
  async createCourse(req : Request,res : Response) : Promise<void>{
    const result = await this._createCourseUseCase.execute(req.body)
    ResponseHelper.success(res,result.data,"Course created successfully",result.statusCode)
  }
  async getCourse(req : Request,res : Response) : Promise<void> {
    const _id = req.params._id as string
    const result = await this._getCourseUseCase.execute(_id)
    ResponseHelper.success(res,result.data,"Course fetched successfully",result.statusCode)
  }

  async updateCourse(req : Request, res : Response) : Promise<void> {
    const _id = req.params._id as string
    const result = await this._updateCourseUseCase.execute(_id,req.body)
    ResponseHelper.success(res,result.data,"Course updated successfully",result.statusCode)
  }
}
