import { OrganizationsRepository } from '@/domain/shortner/application/repositories/organizations-repository'
import { Organization } from '@/domain/shortner/enterprise/entities/Organization'

export class InMemoryOrganizationsRepository
    implements OrganizationsRepository
{
    public items: Organization[] = []

    async create(organization: Organization) {
        this.items.push(organization)
    }
}
