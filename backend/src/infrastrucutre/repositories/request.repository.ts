import { CreateRequestDTO } from "../../application/dtos/request.dto";
import { Request } from "../../domain/entities/request.entity";
import { IRequestRepository } from "../../domain/repositories/request.repository";
import RequestModel, { IRequestDocument } from "../mongodb/models/request.model";

export class RequestRepository implements IRequestRepository {
    async getById(_id : string, options? : {}) : Promise<IRequestDocument | null> {
        const query = {
            request_id : _id,
            ...options
        }
        const request = await RequestModel.findOne(query)
        return request
    }

    async getAll() : Promise<IRequestDocument[]> {
        return await RequestModel.aggregate([
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
        ])
    }

    async create (request : Request) : Promise<IRequestDocument> {
        const newRequest = await RequestModel.create(request)
        return newRequest
    }

    async update (request : Request) : Promise<IRequestDocument | null> {
        const updatedRequest = await RequestModel.findOneAndUpdate({request_id : request.request_id},request,{returnDocument : "after"})
        return updatedRequest
    }

    async getBySubmittedEntity(submitted_by : string,request_type : string,is_approved : boolean) : Promise<IRequestDocument | null> {
        const request = await RequestModel.findOne({submitted_by,request_type,is_approved})
        return request
    }
}