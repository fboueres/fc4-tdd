import { DataSource, Repository } from "typeorm";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { Property } from "../../domain/entities/property";
import { PropertyEntity } from "../persistence/entities/property_entity";

describe("TypeORMPropertyRepository", () => {
    let dataSource: DataSource;
    let propertyRepository: TypeORMPropertyRepository;
    let repository: Repository<PropertyEntity>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [PropertyEntity],
            synchronize: true,
            logging: false,
        });
        await dataSource.initialize();

        repository = dataSource.getRepository(PropertyEntity);

        propertyRepository = new TypeORMPropertyRepository(repository);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    it('deve salvar uma nova propriedade com sucesso', async () => {
        const property = new Property(
            "1",
            "Casa na Praia",
            "Vista para o mar",
            6,
            200
        );

        await propertyRepository.save(property);
        const savedProperty = await repository.findOne({where: {id: property.getId()}});
        expect(savedProperty).not.toBeNull();
        expect(savedProperty?.id).toBe(property.getId());
        expect(savedProperty?.name).toBe(property.getName());
        expect(savedProperty?.description).toBe(property.getDescription());
        expect(savedProperty?.maxGuests).toBe(property.getMaxGuests());
        expect(savedProperty?.basePricePerNight).toBe(property.getBasePricePerNight());
    });

    it('deve retornar uma propriedade com ID válido', async () => {
        const property = new Property(
            "1",
            "Casa na Praia",
            "Vista para o mar",
            6,
            200
        );
        await propertyRepository.save(property);

        const savedProperty = await propertyRepository.findById(property.getId());
        
        expect(savedProperty).not.toBeNull();
        expect(savedProperty).toBeInstanceOf(Property)
        expect(savedProperty?.getId()).toBe(property.getId());
        expect(savedProperty?.getName()).toBe(property.getName());
        expect(savedProperty?.getDescription()).toBe(property.getDescription());
        expect(savedProperty?.getMaxGuests()).toBe(property.getMaxGuests());
        expect(savedProperty?.getBasePricePerNight()).toBe(property.getBasePricePerNight());
    });

    it('deve retornar null ao buscar uma propriedade inexistente', async () => {
        const property = await propertyRepository.findById("999");

        expect(property).toBeNull();
    });
});