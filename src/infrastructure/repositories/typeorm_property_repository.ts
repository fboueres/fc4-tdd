import type { Repository } from "typeorm";
import type { PropertyRepository } from "../../domain/repositories/property_repository";
import { PropertyMapper } from "../persistence/mappers/property_mapper";
import type { PropertyEntity } from "../persistence/entities/property_entity";
import { Property } from "../../domain/entities/property";

export class TypeORMPropertyRepository implements PropertyRepository {
    private readonly repository: Repository<PropertyEntity>;

    constructor(repository: Repository<PropertyEntity>) {
        this.repository = repository;
    }
    
    async save(property: Property): Promise<void> {
        const propertyEntity = PropertyMapper.toPersistence(property);
        await this.repository.save(propertyEntity);
    }

    async findById(id: string): Promise<Property | null> {
        const propertyEntity = await this.repository.findOne({where: {id: id}});

        return propertyEntity ? PropertyMapper.toDomain(propertyEntity) : null;
    }
}