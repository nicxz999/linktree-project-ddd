import { CollectionsRepository } from '@/domain/shortner/application/repositories/collections-repository'
import { Collection } from '@/domain/shortner/enterprise/entities/Collection'

export class InMemoryCollectionsRepository implements CollectionsRepository {
    public items: Collection[] = []

    async create(collection: Collection) {
        this.items.push(collection)
    }
}
