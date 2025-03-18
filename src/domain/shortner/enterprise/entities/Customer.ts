import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CustomerProps {
    username: string
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt?: Date
}

export class Customer extends Entity<CustomerProps> {
    get username() {
        return this.props.username
    }

    get email() {
        return this.props.username
    }

    get passwordHash() {
        return this.props.passwordHash
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set username(username: string) {
        this.props.username = username
        this.touch()
    }

    static create(
        props: Optional<CustomerProps, 'createdAt'>,
        id?: UniqueEntityId
    ) {
        const customer = new Customer({
            ...props,
            createdAt: new Date(),
        })

        return customer
    }
}
