import { OrganizationsRepository } from '@/domain/shortner/application/repositories/organizations-repository'
import { Organization } from '@/domain/shortner/enterprise/entities/Organization'
import { Slug } from '@/domain/shortner/enterprise/entities/value-objects/slug'

export class InMemoryOrganizationsRepository
    implements OrganizationsRepository
{
    public items: Organization[] = []

    async create(organization: Organization) {
        this.items.push(organization)
    }

    async findById(organizationId: string) {
        const organization = this.items.find(item => item.id.toValue() === organizationId)
        
        if(!organization) {
            return null
        }

        return organization
    }

    async updateSlug(slug: Slug, organizationId: string) {
        const organization = this.items.find(item => item.id.toValue() === organizationId)!

        organization.slug = slug
    }

    async findBySlug(slug: string | Slug) {
        const organization = this.items.find(item => item.slug === slug)
        
        if(!organization) {
            return null
        }

        return organization
    }
}
