import { Request, Response } from "express";
import { CreateRequestUseCase } from "../../application/usecases/request/createRequest.usecase";
import { GetRequestUseCase } from "../../application/usecases/request/getRequest.usecase";
import { UpdateRequestStatusUseCase } from "../../application/usecases/admin/updateRequestStatus.usecase";

export class RequestController {
  constructor(private readonly createRequestUseCase: CreateRequestUseCase,
    private readonly getRequestUseCase : GetRequestUseCase,
    private readonly updateRequestStatusUseCase : UpdateRequestStatusUseCase
  ) {}

  async createRequest(req: Request, res: Response): Promise<void> {
    try {
      const request = await this.createRequestUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        request,
      });
    } catch (error) {
      let errorMessage = null;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
      res.status(500).json({
        success: false,
        message: errorMessage ?? "Something went wrong",
      });
    }
  }

  async getRequest(req : Request,res : Response) : Promise<void> {
    try {
        const _id = req.params._id as string
        const request = await this.getRequestUseCase.execute(_id);
        res.status(201).json({
          success: true,
          request,
        });
      } catch (error) {
        let errorMessage = null;
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(error);
        res.status(500).json({
          success: false,
          message: errorMessage ?? "Something went wrong",
        });
      }
  }
  async updateRequest(req : Request,res : Response) : Promise<void> {
    try {
        const _id = req.params._id as string
        console.log(_id)
        const request = await this.updateRequestStatusUseCase.execute({request_id :_id,...req.body});
        res.status(201).json({
          success: true,
          request,
        });
      } catch (error) {
        let errorMessage = null;
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(error);
        res.status(500).json({
          success: false,
          message: errorMessage ?? "Something went wrong",
        });
      }
  }
}
