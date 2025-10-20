import type { Repository } from "typeorm";
import type { PropertyRepository } from "../../domain/repositories/property_repository";
import { PropertyMapper } from "../persistence/mappers/property_mapper";
import type { PropertyEntity } from "../persistence/entities/property_entity";
import type { Property } from "../../domain/entities/property";

export class TypeORMPropertyRepository implements PropertyRepository {
    private readonly repository: Repository<PropertyEntity>;

    constructor(repository: Repository<PropertyEntity>) {
        this.repository = repository;
    }
    
    async save(property: Property): Promise<void> {
        const propertyEntity = PropertyMapper.toPersistence(property);
        await this.repository.save(propertyEntity);
    }

    findById(id: string): Promise<Property | null> {
        throw new Error("Method not implemented.");
    }
}