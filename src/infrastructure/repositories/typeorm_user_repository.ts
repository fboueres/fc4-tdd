import type { User } from "../../domain/entities/user";
import type { UserRepository } from "../../domain/repositories/user_repository";
import type { UserEntity } from "../persistence/entities/user_entity";

export class TypeORMUserRepository implements UserRepository {
    private readonly repository: Repository<UserEntity>
    
    constructor(repository: Repository<UserEntity>) {
        this.repository = repository;
    }

    save(user: User): Promise<void> {
        throw new Error ("Method not implemented.");
    }

    findById(id: string): Promise<void> {
        throw new Error ("Method not implemented.");
    }
}