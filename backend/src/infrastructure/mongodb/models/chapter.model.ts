import { Document, Schema, model } from "mongoose";

export interface IChapterDocument extends Document {
  subject_id: string;
  chapter_id: string;
  chapter_name: string;
  chapter_pdf?: string | null;
  chapter_tutorial?: string | null;
  is_published: boolean;
}

const chapterSchema = new Schema<IChapterDocument>({
    subject_id : {
        type : String,
        required : true,
        ref : "Subject"
    },
    chapter_id : {
        type : String,
        required : true
    },
    chapter_name : {
        type : String,
        required : true
    },
    chapter_pdf : {
        type : String,
        required : false,
        default : null
    },
    chapter_tutorial : {
        type : String,
        required : false,
        default : null
    },
    is_published : {
        type : Boolean,
        required : true,
        default : false
    }
},{
    timestamps : true
})

const ChapterModel = model("Chapter",chapterSchema)

export default ChapterModel