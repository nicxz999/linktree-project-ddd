import { UniqueEntityId } from "./unique-entity-id"

describe('Unique entity ID', () => {
    it('should be able to generate a Unique ID from scratch (without parameters)', () => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const uniqueId = new UniqueEntityId()

        expect(uniqueId.toValue()).toMatch(uuidRegex)
    })

    it('should be able to generate a custom Unique ID', () => {
        const uniqueId = new UniqueEntityId('nicxz-dev')

        expect(uniqueId).toEqual({
            value: 'nicxz-dev'
        })
    })
})
