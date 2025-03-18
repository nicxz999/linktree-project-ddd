import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'
import { Customer } from '../../enterprise/entities/Customer'
import { CustomersRepository } from '../repositories/customers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface FetchCustomerProfileUseCaseRequest {
    customerId: string
}

interface CustomerExternalVisualization {
    props: {
        username: string
        email: string
        createdAt: Date
    }
    _id: UniqueEntityId
}

interface FetchCustomerProfileUseCaseResponse {
    customer: Customer
}

export class FetchCustomerProfileUseCase {
    constructor(private customersRepository: CustomersRepository) {}

    async execute({
        customerId,
    }: FetchCustomerProfileUseCaseRequest): Promise<FetchCustomerProfileUseCaseResponse> {
        const customer = await this.customersRepository.findById(customerId)

        if (!customer) {
            throw new ResourceNotFoundError()
        }

        return {
            customer
        }
    }
}
