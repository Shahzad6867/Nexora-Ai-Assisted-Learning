import { RequestStatus } from "../enums/requestStatus.enum";
import { RequestTypes } from "../enums/requestTypes.enum";

export class Request {
    constructor(
        public readonly request_id : string,
        public request_type : RequestTypes,
        public submitted_by : string,
        public submitted_on :  Date,
        public is_approved : boolean,
        public status_timeline : [{
            status : RequestStatus,
            timestamp : Date,
            note : string | null
        }],
    ){}
}