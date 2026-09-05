import { Request, Response } from "express";
import { ResponseHelper } from "./helpers/response.helper";
import { ICreateRequestUseCase } from "../../application/usecases/request/createRequest/ICreateRequest.usecase";
import { IGetRequestUseCase } from "../../application/usecases/request/getRequest/IGetRequest.usecase";
import { IUpdateRequestStatusUseCase } from "../../application/usecases/admin/updateRequestStatus/IUpdateRequestStatus.usecase";

export class RequestController {
  constructor(
    private readonly _createRequestUseCase: ICreateRequestUseCase,
    private readonly _getRequestUseCase: IGetRequestUseCase,
    private readonly _updateRequestStatusUseCase: IUpdateRequestStatusUseCase
  ) {}

  async createRequest(req: Request, res: Response): Promise<void> {
    const result = await this._createRequestUseCase.execute(req.body);
    ResponseHelper.success(
      res,
      result.data,
      "Request created successfully",
      result.statusCode
    );
  }

  async getRequest(req: Request, res: Response): Promise<void> {
    const _id = req.params._id as string;
    const result = await this._getRequestUseCase.execute(_id);
    ResponseHelper.success(
      res,
      result.data,
      "Request fetched successfully",
      result.statusCode
    );
  }
  async updateRequest(req: Request, res: Response): Promise<void> {
    const _id = req.params._id as string;
    const result = await this._updateRequestStatusUseCase.execute({
      request_id: _id,
      ...req.body,
    });
    ResponseHelper.success(
      res,
      result.data,
      "Request status updated successfully",
      result.statusCode
    );
  }
}
