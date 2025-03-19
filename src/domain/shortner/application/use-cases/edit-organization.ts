import { OrganizationsRepository } from '../repositories/organizations-repository'
import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'
import { SlugAlreadyInUseError } from '../errors/slug-already-in-use-error'
import { Organization } from '../../enterprise/entities/Organization'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

interface EditOrganizationUseCaseRequest {
    organizationId: string
    customerId: string
    name?: string
    biography?: string
    pictureUrl?: string
    socialMediaId?: string
    collectionId?: string
}

interface EditOrganizationUseCaseResponse {
    organization: Organization
}

export class EditOrganizationUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async execute({
        organizationId,
        customerId,
        name,
        biography,
        pictureUrl,
        socialMediaId,
        collectionId,
    }: EditOrganizationUseCaseRequest): Promise<EditOrganizationUseCaseResponse> {
        const doesOrganizationExists =
            await this.organizationsRepository.findById(organizationId)

        if (!doesOrganizationExists) {
            throw new ResourceNotFoundError()
        }

        const organization = Organization.create({
            name: name ?? doesOrganizationExists.name,
            biography: biography ?? doesOrganizationExists.biography,
            pictureUrl: pictureUrl ?? doesOrganizationExists.pictureUrl,
            socialMediaId: socialMediaId
                ? new UniqueEntityId(socialMediaId)
                : undefined,
            collectionId: collectionId
                ? new UniqueEntityId(collectionId)
                : undefined,
            customerId: new UniqueEntityId(customerId),
            status: collectionId ? 'ACTIVE' : 'INACTIVE',
            slug: Slug.createFromText(doesOrganizationExists.slug.toString()),
        })

        await this.organizationsRepository.update(organization, organizationId)

        return {
            organization
        }
    }
}
