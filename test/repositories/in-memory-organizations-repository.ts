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

    async delete(organizationId: string): Promise<void> {
        const index = this.items.findIndex(item => item.id.toValue() === organizationId)!

        this.items.splice(index, 1)
    }

    async fetchByCustomerId(customerId: string) {
        const organizations = this.items.filter(item => item.customerId.toValue() == customerId)

        return organizations
    }
}
