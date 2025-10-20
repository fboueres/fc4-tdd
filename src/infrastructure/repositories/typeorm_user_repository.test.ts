import { DataSource, Repository } from "typeorm";
import { User } from "../../domain/entities/user";

describe("TypeORMUserRepository", () => {
    let dataSource: DataSource;
    let userRepository: TypeORMUserRepository<User>;
    let repository: Repository<UserEntity>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [UserEntity],
            synchronize: true,
            logging: false,
        });
        await dataSource.initialize();

        repository = dataSource.getRepository(UserEntity);

        userRepository = new TypeORMUserRepository(repository);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });
    
    it("deve salvar um usuário com sucesso", async () => {
        const user = new User("1", "John Doe");

        await userRepository.save(user);

        const savedUser = await userRepository.findOne({where: {id: "1"}});
        expect(savedUser).not.toBeNull();
        expect(savedUser).toBeInstanceOf(User);
        expect(savedUser?.getId()).toBe(user.getId());
        expect(savedUser?.getName()).toBe(user.getName());
    });
});
