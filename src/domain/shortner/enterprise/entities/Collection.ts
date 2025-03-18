import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CollectionProps {
    name: string
    description?: string
    customerId: UniqueEntityId
    createdAt: Date
    updatedAt?: Date
}

export class Collection extends Entity<CollectionProps> {
    get name() {
        return this.props.name
    }

    get description() {
        return this.props.description
    }

    get customerId() {
        return this.props.customerId
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

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    set description(description: string | undefined) {
        this.props.description = description
        this.touch()
    }

    static create(
        props: Optional<CollectionProps, 'createdAt'>,
        id?: UniqueEntityId
    ) {
        const collection = new Collection({
            ...props,
            createdAt: new Date(),
        })

        return collection
    }
}
