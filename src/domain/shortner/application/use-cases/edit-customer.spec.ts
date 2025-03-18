import { EditCustomerUseCase } from './edit-customer'
import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import { makeCustomer } from 'test/factories/make-customer'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let sut: EditCustomerUseCase

describe('Create Organization Use Case', () => {
    beforeEach(() => {
        inMemoryCustomersRepository = new InMemoryCustomersRepository()
        sut = new EditCustomerUseCase(inMemoryCustomersRepository)
    })

    it('should be able to edit customer username', async () => {
        const createdCustomer = await makeCustomer()

        inMemoryCustomersRepository.create(createdCustomer)

        const { customer } = await sut.execute({
            username: 'nicxzdev',
            customerId: createdCustomer.id.toValue()
        })

        expect(customer.username).toBe('nicxzdev')
    })
})
