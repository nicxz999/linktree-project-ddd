import { Customer } from '../../enterprise/entities/Customer'
import { CustomersRepository } from '../repositories/customers-repository'
import { hash } from 'bcryptjs'

interface RegisterCustomerUseCaseRequest {
    username: string
    email: string
    password: string
}

interface RegisterCustomerUseCaseResponse {
    customer: Customer
}

export class RegisterCustomerUseCase {
    constructor(private customersRepository: CustomersRepository) {}

    async execute({
        username,
        email,
        password,
    }: RegisterCustomerUseCaseRequest): Promise<RegisterCustomerUseCaseResponse> {
        const customerAlreadyExists =
            await this.customersRepository.findByEmail(email)

        if (customerAlreadyExists) {
            throw new Error()
        }

        const passwordHash = await hash(password, 8)

        const customer = Customer.create({
            username,
            email,
            passwordHash,
        })

        await this.customersRepository.create(customer)

        return {
            customer
        }
    }
}
