import { IRequestDocument } from "../../infrastructure/mongodb/models/request.model";
import { Request } from "../entities/request.entity";
import { RequestTypes } from "../enums/requestTypes.enum";
import { SortBy } from "../enums/sortBy.enum";

export interface IRequestRepository {
  getById: (_id: string, options?: object) => Promise<IRequestDocument | null>;
  getBySubmittedEntity: (
    submitted_by: string,
    request_type: RequestTypes,
    is_approved: boolean
  ) => Promise<IRequestDocument | null>;
  getAll: (
    sortBy : SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string
  ) => Promise<IRequestDocument[]>;
  create: (request: Request) => Promise<IRequestDocument>;
  update: (request_id : string,request: Request) => Promise<IRequestDocument | null>;
}
