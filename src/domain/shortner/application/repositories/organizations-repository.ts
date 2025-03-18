import { Organization } from '../../enterprise/entities/Organization'
import { Slug } from '../../enterprise/entities/value-objects/slug'

export interface OrganizationsRepository {
    create(organization: Organization): Promise<void>
    findById(organizationId: string): Promise<Organization | null>
    updateSlug(slug: Slug, organizationId: string): Promise<void>
    findBySlug(slug: string | Slug): Promise<Organization | null>
}
