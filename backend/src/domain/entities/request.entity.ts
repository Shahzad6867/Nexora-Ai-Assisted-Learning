export class Request {
    constructor(
        public readonly request_id : string,
        public request_type : string,
        public submitted_by : string,
        public submitted_on :  Date,
        public is_approved : boolean,
        public status_timeline : [{
            status : string,
            timestamp : Date,
            note : string | null
        }],
    ){}
}