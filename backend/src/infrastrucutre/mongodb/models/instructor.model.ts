import { model, ObjectId, Schema } from "mongoose";

export interface IInstructorDocument {
  _id: ObjectId;
  institution_id: string;
  instructor_id: string;
  instructor_mail: string;
  instructor_password: string;
  instructor_profile: string | null;
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: Date;
  personal_email: string;
  about: string;
  is_blocked: boolean;
  role: string;
  qualification: {
    title: string;
    type: string;
    institution: string;
    issue_date: Date;
    document_url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const instructorSchema = new Schema<IInstructorDocument>(
  {
    institution_id : {
        type : String,
        required : true,
        ref : "Institution"
    },
    instructor_id : {
        type : String,
        required : true
    },
    instructor_mail : {
        type : String,
        required : true
    },
    instructor_password : {
        type : String,
        required : true
    },
    instructor_profile : {
        type : String,
        default : null
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    date_of_birth : {
        type : Date,
        required : true
    },
    personal_email : {
        type : String,
        required : true
    },
    about : {
        type : String,
        required : true
    },
    is_blocked : {
        type : Boolean,
        required : true,
        default : false
    },
    role : {
        type : String,
        required : true,
        default : "instructor"
    },
    qualification : {
        title : {
            type : String,
            required : true
        },
        type : {
            type : String,
            required : true
        },
        institution : {
            type : String,
            required : true
        },
        issue_date : {
            type : Date,
            required : true
        },
        document_url : {
            type : String,
            default : null
        }
    }
  },
  {
    timestamps: true,
  }
);

const InstructorModel = model<IInstructorDocument>(
  "Instructor",
  instructorSchema
);

export default InstructorModel;
