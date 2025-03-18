import { Organization } from '../../enterprise/entities/Organization'
import { OrganizationsRepository } from '../repositories/organizations-repository'

interface FetchCustomerOrganizationsUseCaseRequest {
    customerId: string
}

interface FetchCustomerOrganizationsUseCaseResponse {
    organizations: Organization[]
}

export class FetchCustomerOrganizationsUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async execute({
        customerId,
    }: FetchCustomerOrganizationsUseCaseRequest): Promise<FetchCustomerOrganizationsUseCaseResponse> {
        const organizations = await this.organizationsRepository.fetchByCustomerId(customerId)

        return {
            organizations
        }
    }
}
