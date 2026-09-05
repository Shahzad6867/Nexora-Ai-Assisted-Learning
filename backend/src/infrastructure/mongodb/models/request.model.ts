import { Document, ObjectId, Schema, model } from "mongoose";
import { RequestStatus } from "../../../domain/enums/requestStatus.enum";
import { RequestTypes } from "../../../domain/enums/requestTypes.enum";
export interface IRequestDocument extends Document {
  request_id: string;
  request_type: RequestTypes;
  submitted_by: string;
  submitted_on: Date;
  is_approved: boolean;
  status_timeline: [
    {
      status: RequestStatus;
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
    enum: Object.values(RequestTypes),
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
        enum: Object.values(RequestStatus),
        default: RequestStatus.SUBMITTED,
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
