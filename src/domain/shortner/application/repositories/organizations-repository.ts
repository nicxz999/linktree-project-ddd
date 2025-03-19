import { Organization } from '../../enterprise/entities/Organization'
import { Slug } from '../../enterprise/entities/value-objects/slug'

export interface OrganizationsRepository {
    create(organization: Organization): Promise<void>
    findById(organizationId: string): Promise<Organization | null>
    updateSlug(slug: Slug, organizationId: string): Promise<void>
    update(organization: Organization, organizationId: string): Promise<Organization>
    findBySlug(slug: string | Slug): Promise<Organization | null>
    fetchByCustomerId(customerId: string): Promise<Organization[]>
    delete(organizationId: string): Promise<void>
}
