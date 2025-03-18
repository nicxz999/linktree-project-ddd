import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug'

type OrganizationStatus = 'ACTIVE' | 'INACTIVE'

// O status da organização por padrão é INACTIVE, ele ficará ACTIVE quando tiver uma coleção atrelada a ele.
// Por padrão a organização é criada somente com o NAME, BIOGRAPHY e PICTUREURL

export interface OrganizationProps {
    name: string
    biography: string
    pictureUrl: string
    slug: Slug
    socialMediaId?: UniqueEntityId
    collectionId?: UniqueEntityId
    customerId: UniqueEntityId
    status: OrganizationStatus
    createdAt: Date
    updatedAt?: Date
}

export class Organization extends Entity<OrganizationProps> {
    get name() {
        return this.props.name
    }

    get biography() {
        return this.props.biography
    }

    get pictureUrl() {
        return this.props.pictureUrl
    }
    
    get slug() {
        return this.props.slug.toValue()
    }

    get socialMediaId() {
        return this.props.socialMediaId
    }

    get collectionId() {
        return this.props.collectionId
    }

    get customerId() {
        return this.props.customerId
    }

    get status() {
        return this.props.status
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    set biography(biography: string) {
        this.props.biography = biography
        this.touch()
    }

    set pictureUrl(pictureUrl: string) {
        this.props.pictureUrl = pictureUrl
        this.touch()
    }

    set slug(text: string | Slug) {
        if(text instanceof Slug) {
            this.props.slug = text
        } else {
            this.props.slug = Slug.createFromText(text)
        }
        this.touch()
    }

    set socialMediaId(socialMediaId: UniqueEntityId | undefined) {
        if(socialMediaId === undefined) {
            return
        }
        this.props.socialMediaId = socialMediaId
        this.touch()
    }

    set collectionId(collectionId: UniqueEntityId | undefined) {
        if(collectionId === undefined) {
            return
        }
        this.props.collectionId = collectionId
        this.touch()
    }

    set status(status: OrganizationStatus) {
        this.props.status = status
        this.touch()
    }

    static create(
        props: Optional<OrganizationProps, 'createdAt' | 'slug' | 'status' | 'pictureUrl' | 'collectionId'>,
        id?: UniqueEntityId
    ) {
        const organization = new Organization({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.name),
            pictureUrl: props.pictureUrl ?? 'https://avatar.iran.liara.run/public/job/operator/male',
            status: props.collectionId ? 'ACTIVE' : 'INACTIVE',
            collectionId: props.collectionId ?? undefined,
            createdAt: new Date(),
        })

        return organization
    }
}
