import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Collection } from '@/domain/shortner/enterprise/entities/Collection'
import { faker } from '@faker-js/faker'

interface makeCollectionProps {
    customerId?: string
}

export async function makeCollection(props?: makeCollectionProps) {
    const collection = Collection.create({
        name: faker.company.name(),
        description: faker.lorem.text(),
        customerId: props?.customerId ? new UniqueEntityId(props.customerId) : new UniqueEntityId()
    })

    return collection
}
