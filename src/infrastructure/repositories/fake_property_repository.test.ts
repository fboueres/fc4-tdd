import { Property } from "../../domain/entities/property";
import { FakePropertyRepository } from "./fake_property_repository";

describe("FakePropertyRepository", () => {
    it("deve salvar uma propriedade e retorná-la com sucesso", async () => {
        const property = new Property(
            "3",
            "Apartamento",
            "Apartamento na Cohama",
            10,
            100
        );
        const fakePropertyRepository = new FakePropertyRepository();

        fakePropertyRepository.save(property);
        const savedProperty = await fakePropertyRepository.findById(property.getId());


        expect(savedProperty).not.toBeNull();
        expect(savedProperty).toBeInstanceOf(Property);
        expect(savedProperty?.getId()).toBe(property.getId());
        expect(savedProperty?.getName()).toBe(property.getName());
        expect(savedProperty?.getDescription()).toBe(property?.getDescription());
        expect(savedProperty?.getMaxGuests()).toBe(property?.getMaxGuests());
        expect(savedProperty?.getBasePricePerNight()).toBe(property?.getBasePricePerNight());
    });
});