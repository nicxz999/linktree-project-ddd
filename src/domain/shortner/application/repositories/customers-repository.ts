import { Customer } from '../../enterprise/entities/Customer'

export interface CustomersRepository {
    create(customer: Customer): Promise<void>
    findByEmail(email: string): Promise<Customer | null>
    findById(customerId: string): Promise<Customer | null>
}
