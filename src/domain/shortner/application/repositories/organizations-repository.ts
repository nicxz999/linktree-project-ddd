import { Organization } from '../../enterprise/entities/Organization'

export interface OrganizationsRepository {
    create(organization: Organization): Promise<void>
}
