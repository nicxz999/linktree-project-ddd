import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { CreateOrganizationUseCase } from './create-organization'
import { faker } from '@faker-js/faker'
import { makeOrganization } from 'test/factories/make-organization'
import { SlugAlreadyInUseError } from '../errors/slug-already-in-use-error'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
    beforeEach(() => {
        inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
        sut = new CreateOrganizationUseCase(inMemoryOrganizationsRepository)
    })

    it('should be able to create a simple organization', async () => {
        const { organization } = await sut.execute({
            name: 'Nome da empresa',
            biography: faker.lorem.text(),
            customerId: 'customer-id',
        })

        expect(organization.status).toBe('INACTIVE')
        expect(organization.slug).toBe('nome-da-empresa')
    })

    it('should not be able to create a organization if the slug already exists', async () => {
        const createdOrganization = await makeOrganization({
            slug: 'Nome da empresa',
        })

        inMemoryOrganizationsRepository.create(createdOrganization)

        await expect(() =>
            sut.execute({
                name: 'Nome da empresa',
                biography: faker.lorem.text(),
                customerId: 'customer-id',
            })
        ).rejects.toBeInstanceOf(SlugAlreadyInUseError)
    })
})
