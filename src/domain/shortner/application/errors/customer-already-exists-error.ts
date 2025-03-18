import { UseCaseError } from '@/core/errors/use-case-error'

export class CustomerAlreadyExistsError extends Error implements UseCaseError {
    constructor() {
        super('Customer with same e-mail already exists.')
    }
}
