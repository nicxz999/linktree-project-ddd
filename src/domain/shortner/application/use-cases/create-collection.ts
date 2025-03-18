import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Collection } from '../../enterprise/entities/Collection'
import { CollectionsRepository } from '../repositories/collections-repository'

interface CreateCollectionUseCaseRequest {
    name: string
    description?: string
    customerId: string
}

interface CreateCollectionUseCaseResponse {
    collection: Collection
}

export class CreateCollectionUseCase {
    constructor(private collectionsRepository: CollectionsRepository) {}

    async execute({
        name,
        description,
        customerId
    }: CreateCollectionUseCaseRequest): Promise<CreateCollectionUseCaseResponse> {
        const collection = Collection.create({
            name,
            description,
            customerId: new UniqueEntityId(customerId)
        })

        await this.collectionsRepository.create(collection)

        return {
            collection,
        }
    }
}
