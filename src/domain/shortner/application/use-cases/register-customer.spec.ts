import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import { RegisterCustomerUseCase } from './register-customer'
import { faker } from '@faker-js/faker'
import { compare } from 'bcryptjs'
import { makeCustomer } from 'test/factories/make-customer'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let sut: RegisterCustomerUseCase

describe('Create Customer Use Case', () => {
    beforeEach(() => {
        inMemoryCustomersRepository = new InMemoryCustomersRepository()
        sut = new RegisterCustomerUseCase(inMemoryCustomersRepository)
    })

    it('should be able to register a new customer', async () => {
        const { customer } = await sut.execute({
            username: faker.person.firstName(),
            email: faker.internet.email(),
            password: '123456',
        })

        expect(customer.createdAt).toEqual(expect.any(Date))
    })

    it('should be able to hash user password', async () => {
        const { customer } = await sut.execute({
            username: faker.person.firstName(),
            email: faker.internet.email(),
            password: '123456',
        })

        const doesPasswordMatches = await compare(
            '123456',
            customer.passwordHash
        )

        expect(doesPasswordMatches).toBeTruthy()
    })

    it('should not be able to register a customer with email twice', async () => {
        const customer = await makeCustomer()

        console.log(customer)

        inMemoryCustomersRepository.create(customer)

        await expect(() =>
            sut.execute({
                username: faker.person.firstName(),
                email: customer.email,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
