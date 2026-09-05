import { RequestStatus } from "../../domain/enums/requestStatus.enum";
import { RequestTypes } from "../../domain/enums/requestTypes.enum";
import { IRequestDocument } from "../../infrastructure/mongodb/models/request.model";

export interface CreateRequestDTO {
  submitted_by: string;
  request_type: RequestTypes;
  note: string;
}

export interface UpdateRequestDTO {
  request_id: string;
  submitted_by?: string;
  status_type: RequestStatus;
  status_note: string;
}

export interface GetRequestsResponseDTO {
  documents: IRequestDocument[];
  totalPages: number;
}
