import { User } from "../../../domain/entities/user";
import { UserEntity } from "../entities/user_entity";
import { UserMapper } from "./user_mapper";

describe("UserMapper", () => {
    it("deve mapear uma entidade para o dominío corretamente", () => {
        const entity = new UserEntity();
        entity.id = "1";
        entity.name = "John Doe";

        const domain = UserMapper.toDomain(entity);

        expect(domain).not.toBeNull();
        expect(domain).toBeInstanceOf(User);
        expect(domain.getId()).toBe(entity.id);
        expect(domain.getName()).toBe(entity.name);
    });

    it("deve mapear do domínio para uma entidade corretamente", () => {
        const domain = new User("1", "John Doe");

        const entity = UserMapper.toPersistence(domain);

        expect(entity).not.toBeNull();
        expect(entity).toBeInstanceOf(UserEntity);
        expect(entity.id).toBe(domain.getId());
        expect(entity.name).toBe(domain.getName());
    });
});