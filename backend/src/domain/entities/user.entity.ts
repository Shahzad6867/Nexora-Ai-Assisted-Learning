export class User {
    constructor(
        public readonly student_id : string,
        public first_name : string,
        public last_name : string,
        public age : number,
        public date_of_birth : Date,
        public email : string,
        public password : string | null,
        public profile_image : string | null,
        public is_blocked : boolean,
        public role : string,
        public google_id ?: string | null
    ){}
}