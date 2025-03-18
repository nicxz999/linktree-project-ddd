import { Customer } from '@/domain/shortner/enterprise/entities/Customer'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'

interface makeCustomerProps {
    password: string
}

export async function makeCustomer(props?: makeCustomerProps) {
    const customer = Customer.create({
        username: faker.person.firstName(),
        email: faker.internet.email(),
        passwordHash: props?.password
            ? await hash(props.password, 8)
            : faker.internet.password(),
    })

    return customer
}
