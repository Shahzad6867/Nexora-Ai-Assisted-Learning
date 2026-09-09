import { Document, Schema, model } from "mongoose";

export interface IModuleDocument extends Document {
    module_id : string,
    course_id : string,
    module_name : string,
    description : string,
    passing_marks : number,
    total_marks : number,
    assignment_required : boolean
} 

const moduleSchema = new Schema({
    module_id : {
        type : String,
        required : true
    },
    course_id : {
        type : String,
        required : true,
        ref : "Course"
    },
    module_name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    passing_marks : {
        type : Number,
        required : true
    },
    total_marks : {
        type : Number,
        required : true
    },
    assignment_required : {
        type : Boolean,
        required : true
    }
},{
    timestamps : true
})

const ModuleModel = model<IModuleDocument>("Module",moduleSchema)

export default ModuleModel