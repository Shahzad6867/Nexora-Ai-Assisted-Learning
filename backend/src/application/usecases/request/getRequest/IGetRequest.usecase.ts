import { IRequestDocument } from "../../../../infrastructure/mongodb/models/request.model";
import { Result } from "../../../helpers/result";

export interface IGetRequestUseCase {
  execute: (_id: string) => Promise<Result<IRequestDocument>>;
}
