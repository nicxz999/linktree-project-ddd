import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { EditOrganizationSlugUseCase } from './edit-organization-slug'
import { makeOrganization } from 'test/factories/make-organization'
import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'
import { SlugAlreadyInUseError } from '../errors/slug-already-in-use-error'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: EditOrganizationSlugUseCase

describe('Edit Organization Slug Use Case', () => {
    beforeEach(() => {
        inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
        sut = new EditOrganizationSlugUseCase(inMemoryOrganizationsRepository)
    })

    it('should be able to edit organization slug', async () => {
        const createdOrganization = await makeOrganization()

        inMemoryOrganizationsRepository.create(createdOrganization)

        expect(inMemoryOrganizationsRepository.items[0].slug).toBe(
            createdOrganization.slug
        )

        await sut.execute({
            text: 'Nome alternativo para o link',
            organizationId: createdOrganization.id.toValue(),
        })

        expect(inMemoryOrganizationsRepository.items[0].slug).toBe(
            'nome-alternativo-para-o-link'
        )
    })

    it('should not be able to edit organization slug if slug already exists in other organization', async () => {
        const createdOrganization = await makeOrganization({
            slug: 'Nome alternativo para o link'
        })

        inMemoryOrganizationsRepository.create(createdOrganization)

        const anotherOrganization = await makeOrganization()

        inMemoryOrganizationsRepository.create(anotherOrganization)

        await expect(() =>
            sut.execute({
                text: 'Nome alternativo para o link',
                organizationId: anotherOrganization.id.toValue(),
            })
        ).rejects.toBeInstanceOf(SlugAlreadyInUseError)
    })

    it('should not be able to edit organization slug if the organization doesnt exists', async () => {
        await expect(() =>
            sut.execute({
                text: 'Nome alternativo para o link',
                organizationId: 'non-existing-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
