import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { makeOrganization } from 'test/factories/make-organization'
import { DeleteOrganizationUseCase } from './delete-organization'
import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: DeleteOrganizationUseCase

describe('Delete Organization Use Case', () => {
    beforeEach(() => {
        inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
        sut = new DeleteOrganizationUseCase(inMemoryOrganizationsRepository)
    })

    it('should be able to delete an organization', async () => {
        const organization = await makeOrganization()

        inMemoryOrganizationsRepository.create(organization)

        await sut.execute({
            organizationId: organization.id.toValue(),
        })

        await expect(inMemoryOrganizationsRepository.items).toHaveLength(0)
    })

    it('should not be able to delete an organization if the organization doesnt exists', async () => {
        await expect(() =>
            sut.execute({
                organizationId: 'non-existing-organization',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
