import { Schema, model } from "mongoose";
import { Document } from "mongoose";
import { required } from "zod/v4/core/util.cjs";

export interface ISubjectDocument extends Document {
  module_id: string;
  subject_id: string;
  subject_name: string;
  description: string;
  assignment_name: string | null;
  assignment_guidline: string | null;
  instructor_id: string;
}

const subjectSchema = new Schema<ISubjectDocument>({
    module_id : {
        type : String,
        required : true,
        ref : "Module"
    },
    subject_id : {
        type : String,
        required : true
    },
    subject_name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    assignment_name : {
        type : String,
        default : null
    },
    assignment_guidline : {
        type : String,
        default : null
    },
    instructor_id : {
        type : String,
        required : true,
        ref : "Instructor"
    }
},{
    timestamps : true
})

const SubjectModel = model("Subject",subjectSchema)

export default SubjectModel