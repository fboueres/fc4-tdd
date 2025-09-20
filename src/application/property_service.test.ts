import { Property } from "../domain/entities/property";
import { FakePropertyRepository } from "../infrastructure/repositories/fake_property_repository";
import { PropertyService } from "./property_service";

describe("PropertyService", () => {
    let propertyService: PropertyService;
    let fakePropertyRepository: FakePropertyRepository;

    beforeEach(() => {
        fakePropertyRepository = new FakePropertyRepository();
        propertyService = new PropertyService(fakePropertyRepository);
    });

    it("deve retornar null quando um ID inválido for passado", async () => {
        const property = await propertyService.findPropertyById("999");
        expect(property).toBeNull();
    });

    it("deve retornar uma propriedade quando um ID válido for fornecido", async () => {
        const property = await propertyService.findPropertyById("1");
        expect(property).not.toBeNull();
        expect(property?.getId()).toBe("1");
        expect(property?.getName()).toBe("Apartamento");
        expect(property?.getDescription()).toBe("Apartamento Moderno");
        expect(property?.getMaxGuests()).toBe(4);
        expect(property?.getBasePricePerNight()).toBe(100);
    });

    it("deve salvar uma nova propriedade com sucesso usando repositorio fake e buscando novamente", async () => {
        const newProperty = new Property("3", "Apartamento", "Apartamento na Cohama, bom e por 100 mil reais", 4, 100);
        await fakePropertyRepository.save(newProperty);
        
        const property = await propertyService.findPropertyById("3");
        
        expect(property).not.toBeNull();
        expect(property?.getId()).toBe("3");
        expect(property?.getName()).toBe("Apartamento");
        expect(property?.getDescription()).toBe("Apartamento na Cohama, bom e por 100 mil reais");
        expect(property?.getMaxGuests()).toBe(4);
        expect(property?.getBasePricePerNight()).toBe(100);
    });
});