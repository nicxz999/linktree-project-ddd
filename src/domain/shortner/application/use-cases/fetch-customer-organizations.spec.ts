import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { makeOrganization } from 'test/factories/make-organization'
import { FetchCustomerOrganizationsUseCase } from './fetch-customer-organizations'
import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let inMemoryCustomersRepository: InMemoryCustomersRepository
let sut: FetchCustomerOrganizationsUseCase

describe('Fetch Customer Organizations Use Case', () => {
    beforeEach(() => {
        inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
        inMemoryCustomersRepository = new InMemoryCustomersRepository()
        sut = new FetchCustomerOrganizationsUseCase(inMemoryOrganizationsRepository)
    })

    it('should be able to fetch customer organizations', async () => {
        const customer = await makeCustomer()

        inMemoryCustomersRepository.create(customer)

        for(let i = 0; i < 3; i++) {
            const organization = await makeOrganization({
                customerId: customer.id.toValue()
            })
            inMemoryOrganizationsRepository.create(organization)
        }

        const { organizations } = await sut.execute({
            customerId: customer.id.toValue()
        })

        expect(organizations).toHaveLength(3)
    })
})
