import { ObjectId, Schema, model } from "mongoose";
export interface IRequestDocument {
  _id: ObjectId;
  request_id: string;
  request_type: string;
  submitted_by: string;
  submitted_on: Date;
  is_approved: boolean;
  status_timeline: [
    {
      status: string;
      timestamp: Date;
      note: string | null;
    }
  ];
}

const requestSchema = new Schema<IRequestDocument>({
  request_id: {
    type: String,
    required: true,
  },
  request_type: {
    type: String,
    required: true,
    enum: ["Institution Onboarding Request"],
  },
  submitted_by: {
    type: String,
    required: true,
    ref: "Institution",
  },
  submitted_on: {
    type: Date,
    required: true,
  },
  is_approved : {
    type: Boolean,
    required: true,
    default : false
  },
  status_timeline: [
    {
      status: {
        type: String,
        required: true,
        enum: ["Submitted", "In Progress", "Approved", "Rejected","Resubmitted"],
        default: "Submitted",
      },
      timestamp: {
        type: Date,
        required: true,
      },
      note: {
        type: String,
        default: null,
      },
    },
  ],
});
const RequestModel = model("Request", requestSchema);

export default RequestModel;
