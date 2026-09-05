import { Request, Response } from "express";
import { ResponseHelper } from "./helpers/response.helper";
import { IGetInstitutionsUseCase } from "../../application/usecases/admin/getInstitutions/IGetInstitutions.usecase";
import { IGetStudentsUseCase } from "../../application/usecases/admin/getStudents/IGetStudents.usecase";
import { IGetRequestsUseCase } from "../../application/usecases/admin/getRequests/IGetRequests.usecase";
import { IGetInstructorsUseCase } from "../../application/usecases/admin/getInstructors/IGetInstructors.usecase";
import { IGetInstitutionAndRequestUseCase } from "../../application/usecases/admin/getInstitutionAndRequest/IGetInstitutionAndRequest";
import { IUpdateRequestStatusUseCase } from "../../application/usecases/admin/updateRequestStatus/IUpdateRequestStatus.usecase";
import { IUpdateIsBlockedEntitytUseCase } from "../../application/usecases/admin/updateIsBlockedEntity/IUpdateIsBlockedEntity.usecase";
import { SortBy } from "../../domain/enums/sortBy.enum";

export class AdminController {
  constructor(
    private readonly _getInstitutionsUseCase: IGetInstitutionsUseCase,
    private readonly _getStudentsUseCase: IGetStudentsUseCase,
    private readonly _getRequestsUseCase: IGetRequestsUseCase,
    private readonly _getInstructorsUseCase: IGetInstructorsUseCase,
    private readonly _getInstitutionAndRequestUseCase: IGetInstitutionAndRequestUseCase,
    private readonly _updateRequestStatusUseCase: IUpdateRequestStatusUseCase,
    private readonly _updateIsBlockedEntityUseCase: IUpdateIsBlockedEntitytUseCase
  ) {}

  async getInstitutions(req: Request, res: Response): Promise<void> {
    const {page,itemsPerPage,sortBy,search} = req.query
    const result = await this._getInstitutionsUseCase.execute(Number(page),Number(itemsPerPage),sortBy as SortBy,search as string | undefined);
    ResponseHelper.success(
      res,
      result.data,
      "Institutions fetched successfully",
      result.statusCode
    );
  }

  async getInstitution(req: Request, res: Response): Promise<void> {
    const _id = req.params._id as string;
    const result = await this._getInstitutionAndRequestUseCase.execute(_id);
    ResponseHelper.success(
      res,
      result.data,
      "Institution and Request fetched successfully",
      result.statusCode
    );
  }

  async getStudents(req: Request, res: Response): Promise<void> {
    const {page,itemsPerPage,sortBy,search} = req.query
    const result = await this._getStudentsUseCase.execute(Number(page),Number(itemsPerPage),sortBy as SortBy,search as string | undefined);
    ResponseHelper.success(
      res,
      result.data,
      "Students fetched successfully",
      result.statusCode
    );
  }
  async getRequests(req: Request, res: Response): Promise<void> {
    const {page,itemsPerPage,search} = req.query
    const result = await this._getRequestsUseCase.execute(Number(page),Number(itemsPerPage),search as string | undefined);
    ResponseHelper.success(
      res,
      result.data,
      "Requests fetched successfully",
      result.statusCode
    );
  }
  async getInstructors(req: Request, res: Response): Promise<void> {
    const {page,itemsPerPage,sortBy,search} = req.query
    const result = await this._getInstructorsUseCase.execute(Number(page),Number(itemsPerPage),sortBy as SortBy,search as string | undefined);
    ResponseHelper.success(
      res,
      result.data,
      "Instructors fetched successfully",
      result.statusCode
    );
  }

  async updateRequestStatus(req: Request, res: Response): Promise<void> {
    const request_id = req.params._id as string;
    const requestResult = await this._updateRequestStatusUseCase.execute({
      request_id,
      ...req.body,
    });
    const result = await this._getInstitutionAndRequestUseCase.execute(
      requestResult.data!
    );
    ResponseHelper.success(
      res,
      result.data,
      "Request status updated successfully",
      result.statusCode
    );
  }

  async updateIsBlockedEntity(req: Request, res: Response) {
    const result = await this._updateIsBlockedEntityUseCase.execute(
      req.body
    );
    ResponseHelper.success(res, result.data, "Entity blocked successfully", result.statusCode);
  }
}
