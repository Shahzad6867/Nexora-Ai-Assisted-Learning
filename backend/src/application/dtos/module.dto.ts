export interface CreateModuleRequestDTO {
    course_id : string,
    module_name : string,
    description : string,
    passing_marks : number,
    total_marks : number,
    assignment_required : boolean
}

export interface GetModuleResponseDTO {
    module_id : string,
    module_name : string,
    description : string,
    passing_marks : number,
    total_marks : number,
    assignment_required : boolean,
    subjects: any[]
}