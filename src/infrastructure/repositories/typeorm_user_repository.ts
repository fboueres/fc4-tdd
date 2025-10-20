import type { Repository } from "typeorm";
import type { User } from "../../domain/entities/user";
import type { UserRepository } from "../../domain/repositories/user_repository";
import { UserEntity } from "../persistence/entities/user_entity";
import { UserMapper } from "../persistence/mappers/user_mapper";

export class TypeORMUserRepository implements UserRepository {
    private readonly repository: Repository<UserEntity>
    
    constructor(repository: Repository<UserEntity>) {
        this.repository = repository;
    }

    async save(user: User): Promise<void> {
        const userEntity = UserMapper.toPersistence(user);
        await this.repository.save(userEntity);
    }

    async findById(id: string): Promise<User|null> {
        const userEntity = await this.repository.findOne({where: {id: id}});
        return userEntity ? UserMapper.toDomain(userEntity) : null;
    }
}