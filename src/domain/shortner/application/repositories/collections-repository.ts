import { Collection } from '../../enterprise/entities/Collection'

export interface CollectionsRepository {
    create(collection: Collection): Promise<void>
}
