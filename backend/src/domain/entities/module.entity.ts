export class Module {
    constructor(
        public readonly module_id : string,
        public readonly course_id : string,
        public module_name : string,
        public description : string,
        public passing_marks : number,
        public total_marks : number,
        public assignment_required : boolean
    ){}
}