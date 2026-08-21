import { Request, Response } from "express";
import { GetInstitutionsUseCase } from "../../application/usecases/admin/getInstitutions.usecase";
import { GetInstitutionAndRequestUseCase } from "../../application/usecases/admin/getInstitutionAndRequest.usecase";
import { GetStudentsUseCase } from "../../application/usecases/admin/getStudents.usecase";
import { GetRequestsUseCase } from "../../application/usecases/admin/getRequests.usecase";
import { GetInstructorsUseCase } from "../../application/usecases/admin/getInstructors.usecase";
import { UpdateRequestStatusUseCase } from "../../application/usecases/admin/updateRequestStatus.usecase";

export class AdminController {
  constructor(
    private readonly getInstitutionsUseCase: GetInstitutionsUseCase,
    private readonly getStudentsUseCase: GetStudentsUseCase,
    private readonly getRequestsUseCase : GetRequestsUseCase,
    private readonly getInstructorsUseCase : GetInstructorsUseCase,
    private readonly getInstitutionAndRequestUseCase : GetInstitutionAndRequestUseCase,
    private readonly updateRequestStatusUseCase : UpdateRequestStatusUseCase
  ) {}

  async getInstitutions(req: Request, res: Response): Promise<void> {
    try {
      const institutions = await this.getInstitutionsUseCase.execute();
      res.status(201).json({
        success: true,
        institutions,
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

  async getInstitution(req : Request, res :Response) : Promise<void> {
    try {
      const _id = req.params._id as string
      const response = await this.getInstitutionAndRequestUseCase.execute(_id);
      res.status(201).json({
        success: true,
        ...response
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

  async getStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await this.getStudentsUseCase.execute();
      res.status(201).json({
        success: true,
        students,
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
  async getRequests(req: Request, res: Response): Promise<void> {
    try {
      const students = await this.getRequestsUseCase.execute();
      res.status(201).json({
        success: true,
        students,
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
  async getInstructors(req: Request, res: Response): Promise<void> {
    try {
      const instructors = await this.getInstructorsUseCase.execute();
      res.status(201).json({
        success: true,
        instructors
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

  async updateRequestStatus (req : Request, res : Response) : Promise<void> {
    try {
      const request_id = req.params._id as string
       const institutionId = await this.updateRequestStatusUseCase.execute({request_id,...req.body});
      const response = await this.getInstitutionAndRequestUseCase.execute(institutionId)
      res.status(201).json({
        success: true,
        ...response
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
