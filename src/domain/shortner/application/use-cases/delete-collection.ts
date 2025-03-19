import { CollectionsRepository } from '../repositories/collections-repository'
import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'

interface DeleteCollectionUseCaseRequest {
    collectionId: string
}

interface DeleteCollectionUseCaseResponse {}

export class DeleteCollectionUseCase {
    constructor(private collectionsRepository: CollectionsRepository) {}

    async execute({
        collectionId
    }: DeleteCollectionUseCaseRequest): Promise<DeleteCollectionUseCaseResponse> {
        const doesCollectionExists = await this.collectionsRepository.findById(collectionId)
        
        if(!doesCollectionExists) {
            throw new ResourceNotFoundError()
        }

        await this.collectionsRepository.delete(collectionId)

        return {}
    }
}
