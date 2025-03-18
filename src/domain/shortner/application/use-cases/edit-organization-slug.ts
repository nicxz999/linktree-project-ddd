import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Organization } from '../../enterprise/entities/Organization'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { SlugAlreadyInUseError } from '../errors/slug-already-in-use-error'

interface EditOrganizationSlugUseCaseRequest {
    text: string
    organizationId: string
}

interface EditOrganizationSlugUseCaseResponse {}

export class EditOrganizationSlugUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async execute({
        text,
        organizationId
    }: EditOrganizationSlugUseCaseRequest): Promise<EditOrganizationSlugUseCaseResponse> {
        const doesOrganizationExists = await this.organizationsRepository.findById(organizationId)

        if(!doesOrganizationExists) {
            throw new ResourceNotFoundError()
        }

        const textSlug = Slug.createFromText(text)

        const doesSlugAlreadyExists = await this.organizationsRepository.findBySlug(textSlug.toValue())

        if(doesSlugAlreadyExists) {
            throw new SlugAlreadyInUseError()
        }

        await this.organizationsRepository.updateSlug(
            textSlug,
            organizationId
        )

        return {}
    }
}
