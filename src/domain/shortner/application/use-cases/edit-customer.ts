import { Customer } from '../../enterprise/entities/Customer'
import { CustomersRepository } from '../repositories/customers-repository'

interface EditCustomerUseCaseRequest {
    username: string
    customerId: string
}

interface EditCustomerUseCaseResponse {
    customer: Customer
}

export class EditCustomerUseCase {
    constructor(private customersRepository: CustomersRepository) {}

    async execute({
        username,
        customerId,
    }: EditCustomerUseCaseRequest): Promise<EditCustomerUseCaseResponse> {
        const customer = await this.customersRepository.updateCustomer(
            username,
            customerId
        )

        return {
            customer,
        }
    }
}
