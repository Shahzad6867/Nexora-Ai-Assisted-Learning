import { IRequestRepository } from "../../../../domain/repositories/request.repository";
import { IRequestDocument } from "../../../../infrastructure/mongodb/models/request.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { Result } from "../../../helpers/result";
import { REQUEST_MESSAGES } from "../request.usecase.messages";

export class GetRequestUseCase {
  constructor(private readonly _requestRepository: IRequestRepository) {}
  async execute(_id: string): Promise<Result<IRequestDocument>> {
    const request = await this._requestRepository.getById(_id);
    if (request === null) {
      throw new AppError(
        REQUEST_MESSAGES.NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND
      );
    }

    return Result.success<IRequestDocument>(request, HTTP_STATUS_CODES.OK);
  }
}
