import { Request, Response } from "express";
import { ResponseHelper } from "./helpers/response.helper";
import { ICreateModuleUseCase } from "../../application/usecases/module/createModule/ICreateModule.usecase";
import { IUpdateModuleUseCase } from "../../application/usecases/module/updateModule/IUpdateModule.usecase";
import { IDeleteModuleUseCase } from "../../application/usecases/module/deleteModule/IDeleteModule.usecase";
import { IGetModuleUseCase } from "../../application/usecases/module/getModule/IGetModule.usecase";

export class ModuleController {
    constructor(
        private readonly _createModuleUseCase : ICreateModuleUseCase,
        private readonly _updateModuleUseCase : IUpdateModuleUseCase,
        private readonly _deleteModuleUseCase : IDeleteModuleUseCase,
        private readonly _getModuleUseCase : IGetModuleUseCase
    ){}
    async createModule (req : Request, res : Response) : Promise<void> {
        const result = await this._createModuleUseCase.execute(req.body)
        ResponseHelper.success(res,result.data,"Module created successfully",result.statusCode)
    }
    async updateModule (req : Request, res : Response) : Promise<void> {
        const _id = req.params._id as string
        const result = await this._updateModuleUseCase.execute(_id,req.body)
        ResponseHelper.success(res,result.data,"Module updated successfully",result.statusCode)
    }
    async deleteModule (req : Request, res :Response) : Promise<void> {
        const _id = req.params._id as string
        const result = await this._deleteModuleUseCase.execute(_id)
        ResponseHelper.success(res,result.data,"Module deleted successfully",result.statusCode)
    }
    async getModule (req : Request, res : Response) : Promise<void> {
        const _id = req.params._id as string
        const result = await this._getModuleUseCase.execute(_id)
        ResponseHelper.success(res,result.data,"Module fetched successfully",result.statusCode)
    }
}