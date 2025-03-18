import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Organization } from '../../enterprise/entities/Organization'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { SlugAlreadyInUseError } from '../errors/slug-already-in-use-error'

interface CreateOrganizationUseCaseRequest {
    name: string
    biography: string
    pictureUrl?: string
    customerId: string
    collectionId?: string
}

interface CreateOrganizationUseCaseResponse {
    organization: Organization
}

export class CreateOrganizationUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async execute({
        name,
        biography,
        pictureUrl,
        customerId,
        collectionId,
    }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
        const organization = Organization.create({
            name,
            biography,
            pictureUrl,
            customerId: new UniqueEntityId(customerId),
            collectionId: collectionId
                ? new UniqueEntityId(collectionId)
                : undefined,
        })

        const doesSlugAlreadyExists = await this.organizationsRepository.findBySlug(organization.slug)
        
        if(doesSlugAlreadyExists) {
            throw new SlugAlreadyInUseError()
        }

        await this.organizationsRepository.create(organization)

        return {
            organization,
        }
    }
}
