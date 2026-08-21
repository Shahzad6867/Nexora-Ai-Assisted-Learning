import { Request } from "../../../domain/entities/request.entity";
import { IRequestRepository } from "../../../domain/repositories/request.repository";
import { IRequestDocument } from "../../../infrastrucutre/mongodb/models/request.model";
import { CreateRequestDTO } from "../../dtos/request.dto";
import { IEntityIdGenerator } from "../../interfaces/IEntityIdGenerator.interface";

export class CreateRequestUseCase {
  constructor(
    private readonly requestRepository: IRequestRepository,
    private readonly requestIdGenerator: IEntityIdGenerator
  ) {}
  async execute(dto: CreateRequestDTO): Promise<IRequestDocument> {
      const request_id = this.requestIdGenerator.generate("REQ");
      const now = new Date();
      const request = new Request(
        request_id,
        dto.request_type,
        dto.submitted_by,
        now,
        false,
        [{ status: "Submitted", timestamp: now, note: dto?.note }]
      );
      return await this.requestRepository.create(request)
      
  }
}
