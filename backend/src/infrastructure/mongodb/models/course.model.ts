import {model,Document,Schema} from "mongoose";

export interface ICourseDocument extends Document {
    institution_id : string;
    course_id : string;
    course_name : string;
    course_subtitle : string;
    description : string;
    course_category : string;
    course_banner : string | null;
    price : number;
    price_per_module : number;
    is_archived : boolean;
    is_published : boolean;
    is_approved : boolean;
    createdAt: Date;
    updatedAt: Date;
  }

const courseSchema = new Schema<ICourseDocument>({
    institution_id : {
        type : String,
        required : true,
        ref : "Institution"
    },
    course_id : {
        type : String,
        required : true
    },
    course_name : {
        type : String,
        required : true
    },
    course_subtitle : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    course_category : {
        type : String,
        required : true
    },
    course_banner : {
        type : String,
        default : null
    },
    price : {
        type : Number,
        required : true
    },
    price_per_module : {
        type : Number,
        required : true
    },
    is_archived : {
        type : Boolean,
        required : true,
        default : false
    },
    is_published : {
        type : Boolean,
        required : true,
        default : false
    },
    is_approved : {
        type : Boolean,
        required : true,
        default : false
    }
},{
    timestamps : true
})

const CourseModel = model<ICourseDocument>("Course",courseSchema)

export default CourseModel