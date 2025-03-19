import { Collection } from '../../enterprise/entities/Collection'

export interface CollectionsRepository {
    create(collection: Collection): Promise<void>
    findById(collectionId: string): Promise<Collection | null>
    delete(collectionId: string): Promise<void>
}
