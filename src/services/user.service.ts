import { verify } from 'jsonwebtoken';
import { generateToken } from '../auth/token';
import config from '../config/config';
import { IUserDal } from '../interfaces/DAL/userDal.interface';
import { IUserService } from '../interfaces/services/userService.interface';
import { ILogger } from '../log/logger';
import User from '../types/user.type';
import { decrypt, encrypt } from '../utils/encrypt';

export class UserService implements IUserService {
    private UserRepo: IUserDal;
    private _logger: ILogger;

    constructor(userRepo: IUserDal, logger: ILogger) {
        this.UserRepo = userRepo;
        this._logger = logger;
    }

    public auth = async (token: string) => {
        const payload: any = verify(token, config.keys.tokenKey);

        if (!payload || !payload.userIdEnc) return null;

        const userId = decrypt(payload.userIdEnc);

        const user = await this.getUserById(userId);

        if (!user) return null;

        return userId;
    };

    public createUser = async (user: User) => {
        const newUser = await this.UserRepo.create({
            name: user.name,
            password: encrypt(user.password!),
        });

        this._logger.logInfo({ message: 'User created successfully' });

        return newUser;
    };

    public updateUser = async (userId: string, name: string) => {
        const user = await this.UserRepo.updateName(userId, name);
        return user;
    };

    public deleteUser = async (userId: string) => {
        const user = await this.UserRepo.delete(userId);
        return user;
    };

    public getUserById = async (userId: string) => {
        const user = await this.UserRepo.getById(userId);
        return user;
    };

    public getAllUsers = async () => {
        const users = await this.UserRepo.getAll();
        return users;
    };

    public getUserByNameAndPassword = async (name: string, password: string) => {
        const user = await this.UserRepo.getByNameAndPassword(name, encrypt(password));
        return user;
    };

    public login = async (name: string, password: string) => {
        const user = await this.getUserByNameAndPassword(name, password);

        if (!user) return null;

        const token = generateToken(user._id!.toString());
        return { user, token };
    };
}
