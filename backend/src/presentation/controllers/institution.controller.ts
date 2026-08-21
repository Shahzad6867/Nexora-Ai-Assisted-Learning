import { Request, Response } from "express";
import { GetInstitutionProfileUseCase } from "../../application/usecases/institution/getInstitutionProfile.usecaase";
import { UpdateInstitutionProfileUseCase } from "../../application/usecases/institution/updateInstitutionProfile.usecase";
import { CreateInstructorUseCase } from "../../application/usecases/instructor/createInstructor.usecase";
import { GetInstructorsOfInstitutionUseCase } from "../../application/usecases/institution/getInstructorsOfInstitution.usecase";


export class InstitutionController {
    constructor(
        private readonly getInstitutionProfileUseCase : GetInstitutionProfileUseCase,
        private readonly updateInstitutionProfileUseCase : UpdateInstitutionProfileUseCase,
        private readonly createInstructorUseCase : CreateInstructorUseCase,
        private readonly getInstructorsOfInstitutionUseCase : GetInstructorsOfInstitutionUseCase
    ){}

    async getInstitution(req : Request, res : Response) : Promise<void> {
        try {
            const _id = req.params._id as string;
            const institution = await this.getInstitutionProfileUseCase.execute({_id})
            const instructors = await this.getInstructorsOfInstitutionUseCase.execute(_id)
            res.status(201).json({
                success : true,
                institution,
                instructors
            })
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

    async updateInstitutionProfile(req : Request, res : Response) : Promise<void> {
        try {
            const _id = req.params._id as string;
            const institution = await this.updateInstitutionProfileUseCase.execute(_id,req.body)
            res.status(201).json({
                success : true,
                institution
            })
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

    async createInstructor(req : Request, res : Response) : Promise<void> {
        try {
            console.log(req.body)
            const instructor = await this.createInstructorUseCase.execute(req.body)
            res.status(201).json({
                success : true,
                instructor
            })
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