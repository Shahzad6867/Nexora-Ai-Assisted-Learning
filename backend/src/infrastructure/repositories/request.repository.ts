import { PipelineStage } from "mongoose";
import { CreateRequestDTO } from "../../application/dtos/request.dto";
import { Request } from "../../domain/entities/request.entity";
import { RequestTypes } from "../../domain/enums/requestTypes.enum";
import { IRequestRepository } from "../../domain/repositories/request.repository";
import RequestModel, { IRequestDocument } from "../mongodb/models/request.model";
import { BaseRepository } from "./base/base.repository";
import { SortBy } from "../../domain/enums/sortBy.enum";

export class RequestRepository extends BaseRepository<IRequestDocument> implements IRequestRepository {
    async getById(_id : string, options? : {}) : Promise<IRequestDocument | null> {
        const query = {
            request_id : _id,
            ...options
        }
        const request = await RequestModel.findOne(query)
        return request
    }

    async getAll(sortBy : SortBy,skip ?: number, itemsPerPage ?: number,search ?: string) : Promise<IRequestDocument[]> {
        const query : PipelineStage[] = [
            {
                $lookup : {
                    from : "institutions",
                    localField : "submitted_by",
                    foreignField : "institution_id",
                    as : "submitted_by"
                }
            },{
                $unwind : "$submitted_by"
            }
        ]
        if(search !== undefined){
            query.unshift({
                $match : {
                    $or: [
                        { request_id: { $regex: search, $options: "i" } },
                        { submitted_by: { $regex: search, $options: "i" } }
                    ]
                }
            })
        }
        if(skip !== undefined && itemsPerPage !== undefined){
            query.push({
                $skip : skip
            })
            query.push({
                $limit : itemsPerPage
            })
        }
        return await RequestModel.aggregate(query)
    }

    async create (request : Request) : Promise<IRequestDocument> {
        const newRequest = await RequestModel.create(request)
        return newRequest
    }

    async update (request_id : string,request : Request) : Promise<IRequestDocument | null> {
        const updatedRequest = await RequestModel.findOneAndUpdate({request_id},request,{returnDocument : "after"})
        return updatedRequest
    }

    async getBySubmittedEntity(submitted_by : string,request_type : RequestTypes ,is_approved : boolean) : Promise<IRequestDocument | null> {
        const request = await RequestModel.findOne({submitted_by,request_type,is_approved})
        return request
    }
}