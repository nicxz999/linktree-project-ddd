import { CustomersRepository } from '@/domain/shortner/application/repositories/customers-repository'
import { Customer } from '@/domain/shortner/enterprise/entities/Customer';

export class InMemoryCustomersRepository implements CustomersRepository {
    public items: Customer[] = []

    async create(customer: Customer) {
        this.items.push(customer)
    }

    async findByEmail(email: string) {
        const customer = this.items.find(item => item.email === email)
        
        if(!customer) {
            return null
        }

        return customer
    }

    async findById(customerId: string) {
        const customer = this.items.find(item => item.id.toValue() === customerId)
        
        if(!customer) {
            return null
        }

        return customer
    }

    async updateCustomer(username: string, customerId: string) {
        const customer = this.items.find(item => item.id.toValue() === customerId)!

        customer.username = username

        return customer
    }
}
