import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import { makeCustomer } from 'test/factories/make-customer'
import { FetchCustomerProfileUseCase } from './fetch-customer-profile'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let sut: FetchCustomerProfileUseCase

describe('Fetch Customer Profile Use Case', () => {
    beforeEach(() => {
        inMemoryCustomersRepository = new InMemoryCustomersRepository()
        sut = new FetchCustomerProfileUseCase(inMemoryCustomersRepository)
    })

    it('should be able to fetch a customer profile', async () => {
        const createdCustomer = await makeCustomer()

        inMemoryCustomersRepository.create(createdCustomer)

        const { customer } = await sut.execute({
            customerId: createdCustomer.id.toValue()
        })

        expect(customer.createdAt).toEqual(expect.any(Date))
        expect(inMemoryCustomersRepository.items).toHaveLength(1)
    })

    it('should not be able to fetch a customer profile if the customer doesnt exists', async () => {
        await expect(() => sut.execute({
            customerId: new UniqueEntityId().toValue()
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
