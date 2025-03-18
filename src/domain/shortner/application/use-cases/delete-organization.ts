import { OrganizationsRepository } from '../repositories/organizations-repository'
import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'

interface DeleteOrganizationUseCaseRequest {
    organizationId: string
}

interface DeleteOrganizationUseCaseResponse {}

export class DeleteOrganizationUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async execute({
        organizationId
    }: DeleteOrganizationUseCaseRequest): Promise<DeleteOrganizationUseCaseResponse> {
        const doesOrganizationExists = await this.organizationsRepository.findById(organizationId)
        
        if(!doesOrganizationExists) {
            throw new ResourceNotFoundError()
        }

        await this.organizationsRepository.delete(organizationId)

        return {}
    }
}
