import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { CreateOrganizationUseCase } from './create-organization'
import { makeCustomer } from 'test/factories/make-customer'
import { faker } from '@faker-js/faker'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
    beforeEach(() => {
        inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
        sut = new CreateOrganizationUseCase(inMemoryOrganizationsRepository)
    })

    it('should be able to create a simple organization', async() => {
        const createdCustomer = await makeCustomer()

        const { organization } = await sut.execute({
            name: 'Nome da empresa',
            biography: faker.lorem.text(),
            customerId: createdCustomer.id.toValue(),
        })

        expect(organization.status).toBe('INACTIVE')
        expect(organization.slug).toBe('nome-da-empresa')
    })
})
