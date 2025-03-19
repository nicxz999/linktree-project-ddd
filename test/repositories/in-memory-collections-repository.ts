import { CollectionsRepository } from '@/domain/shortner/application/repositories/collections-repository'
import { Collection } from '@/domain/shortner/enterprise/entities/Collection'

export class InMemoryCollectionsRepository implements CollectionsRepository {
    public items: Collection[] = []

    async create(collection: Collection) {
        this.items.push(collection)
    }

    async findById(collectionId: string) {
        const collection = this.items.find(item => item.id.toValue() === collectionId)

        if(!collection) {
            return null
        }

        return collection
    }

    async delete(collectionId: string) {
        const index = this.items.findIndex(item => item.id.toValue() === collectionId)!

        this.items.splice(index, 1)
    }
}
