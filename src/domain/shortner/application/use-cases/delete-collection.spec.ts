import { ResourceNotFoundError } from '@/core/errors/generic-errors/resource-not-found-error'
import { DeleteCollectionUseCase } from './delete-collection'
import { InMemoryCollectionsRepository } from 'test/repositories/in-memory-collections-repository'
import { makeCollection } from 'test/factories/make-collection'

let inMemoryCollectionsRepository: InMemoryCollectionsRepository
let sut: DeleteCollectionUseCase

describe('Delete Collection Use Case', () => {
    beforeEach(() => {
        inMemoryCollectionsRepository = new InMemoryCollectionsRepository()
        sut = new DeleteCollectionUseCase(inMemoryCollectionsRepository)
    })

    it('should be able to delete a collection', async () => {
        const collection = await makeCollection()

        inMemoryCollectionsRepository.create(collection)

        await sut.execute({
            collectionId: collection.id.toValue(),
        })

        await expect(inMemoryCollectionsRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a collection if the organization doesnt exists', async () => {
        await expect(() =>
            sut.execute({
                collectionId: 'non-existing-organization',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
