import User from '../../types/user.type';

export interface IUserDal {
    getById(userId: string): Promise<User | null>;
    getByNameAndPassword(name: string, arg1: string): Promise<User | null>;
    create(user: User): Promise<User>;
    updateName(userId: string, name: string): Promise<User | null>;
    delete(userId: string): Promise<User | null>;
    get(userId: string): Promise<User | null>;
    getAll(): Promise<User[] | null>;
}
