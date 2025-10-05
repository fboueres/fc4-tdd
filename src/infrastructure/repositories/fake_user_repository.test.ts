import { FakeUserRepository } from './fake_user_repository';
import { User } from "../../domain/entities/user";

describe("FakeUserRepository", () => {
    it('deve salvar um usuário e retorná-lo com sucesso', async () => {
        const user = new User(
            "3",
            "João Pessoa"
        );
        const fakeUserRepository = new FakeUserRepository();

        fakeUserRepository.save(user);
        const savedUser = await fakeUserRepository.findById(user.getId());

        expect(savedUser).not.toBeNull();
        expect(savedUser).toBeInstanceOf(User);
        expect(savedUser?.getId()).toBe(user.getId());
        expect(savedUser?.getName()).toBe(user.getName());
    });
});