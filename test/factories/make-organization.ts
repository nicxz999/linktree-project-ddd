import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Organization } from '@/domain/shortner/enterprise/entities/Organization'
import { Slug } from '@/domain/shortner/enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

interface makeOrganizationProps {
    collectionId?: string
    slug?: string
    customerId?: string
}

export async function makeOrganization(props?: makeOrganizationProps) {
    const organization = Organization.create({
        name: faker.company.name(),
        biography: faker.lorem.text(),
        customerId: props?.customerId ? new UniqueEntityId(props.customerId) : new UniqueEntityId(),
        collectionId: props?.collectionId ? new UniqueEntityId(props.collectionId) : undefined,
        slug: props?.slug ? Slug.createFromText(props?.slug) : undefined
    })

    return organization
}
