import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { makeOrganization } from 'test/factories/make-organization'
import { EditOrganizationUseCase } from './edit-organization'
import { makeCustomer } from 'test/factories/make-customer'
import { makeCollection } from 'test/factories/make-collection'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: EditOrganizationUseCase

describe('Edit Organization Slug Use Case', () => {
    beforeEach(() => {
        inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
        sut = new EditOrganizationUseCase(inMemoryOrganizationsRepository)
    })

    it('should be able to edit organization', async () => {
        const createdCustomer = await makeCustomer()
        const createdCollection = await makeCollection({
            customerId: createdCustomer.id.toValue()
        })
        const createdOrganization = await makeOrganization({
            customerId: createdCustomer.id.toValue()
        })

        inMemoryOrganizationsRepository.create(createdOrganization)

        const { organization } = await sut.execute({
            customerId: createdCustomer.id.toValue(),
            organizationId: createdOrganization.id.toValue(),
            name: 'nicxz organization',
            biography: 'nova biografia',
            collectionId: createdCollection.id.toValue()
        })

        expect(organization.name).toBe('nicxz organization')
        expect(organization.status).toBe('ACTIVE')
    })
})
