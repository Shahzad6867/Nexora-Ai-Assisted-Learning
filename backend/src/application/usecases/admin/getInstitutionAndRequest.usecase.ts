import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";
import { IRequestRepository } from "../../../domain/repositories/request.repository";
export class GetInstitutionAndRequestUseCase {
  constructor(
    private readonly institutionRepository: IInstitutionRepository,
    private readonly requestRepository: IRequestRepository
  ) {}
  async execute(_id : string) {
    const institution = await this.institutionRepository.getById(_id);
    const request = institution !== null ? await this.requestRepository.getBySubmittedEntity(institution.institution_id,"Institution Onboarding Request",false) : null
    return {
      institution,
      request
    }
  }
}
