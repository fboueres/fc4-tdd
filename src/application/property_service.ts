import type { Property } from "../domain/entities/property";
import type { PropertyRepository } from "../domain/repositories/property_repository";

export class PropertyService {
    constructor(
        private readonly propertyRepository: PropertyRepository
    ){}

    async findPropertyById(id: string): Promise <Property | null> {
        return this.propertyRepository.findById(id);
    }
}