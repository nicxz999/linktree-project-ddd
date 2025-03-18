import { CreateCollectionUseCase } from './create-collection'
import { InMemoryCollectionsRepository } from 'test/repositories/in-memory-collections-repository'

let inMemoryCollectionsRepository: InMemoryCollectionsRepository
let sut: CreateCollectionUseCase

describe('Create Collection Use Case', () => {
    beforeEach(() => {
        inMemoryCollectionsRepository = new InMemoryCollectionsRepository()
        sut = new CreateCollectionUseCase(inMemoryCollectionsRepository)
    })

    it('should be able to create a collection', async () => {
        const { collection } = await sut.execute({
            name: 'coleção 1',
            customerId: 'customer-id'
        })

        expect(collection.createdAt).toEqual(expect.any(Date))
    })
})
