import { IRequestDocument } from "../../infrastrucutre/mongodb/models/request.model";
import { Request } from "../entities/request.entity";

export interface IRequestRepository {
    getById : (_id : string, options?: object) => Promise<IRequestDocument | null>
    getBySubmittedEntity : (submitted_by : string,request_type : string,is_approved : boolean) => Promise<IRequestDocument | null>
    getAll : () => Promise<IRequestDocument[]> 
    create : (request : Request) => Promise<IRequestDocument> 
    update : (request : Request) => Promise<IRequestDocument | null> 
}