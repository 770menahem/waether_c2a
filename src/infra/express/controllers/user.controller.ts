import { Request, Response } from 'express';
import { IUserService } from '../../../interfaces/services/userService.interface';
import { LoginUser } from '../../../types/loginUser.type';
import User from '../../../types/user.type';
import { ServiceError } from '../utils/error';
import { IUserController } from './userController.interface';

export class UserController implements IUserController {
    private UserService: IUserService;

    constructor(UserService: IUserService) {
        console.log('UserController created');
        this.UserService = UserService;
    }

    public login = async (req: Request, res: Response) => {
        const name = req.body.name;
        const password = req.body.password;
        const user: LoginUser | null = await this.UserService.login(name, password);

        if (!user) throw new ServiceError(404, 'fail to login');
        else res.send(user);
    };

    public createUser = async (req: Request, res: Response) => {
        const user: User | null = await this.UserService.createUser(req.body);

        if (!user) throw new ServiceError(404, 'fail to create user');

        res.send(user);
    };

    public updateUser = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const name = req.body.name;

        const user: User | null = await this.UserService.updateUser(userId, name);
        if (!user) throw new ServiceError(404, 'fail to update user');
        else res.send(user);
    };

    public deleteUser = async (req: Request, res: Response) => {
        const userId = req.params.userId;

        const user: User | null = await this.UserService.deleteUser(userId);
        if (!user) throw new ServiceError(404, 'fail to delete user');
        else res.send({ msg: 'User deleted', user });
    };

    public getUserById = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const user: User | null = await this.UserService.getUserById(userId);
        if (!user) throw new ServiceError(404, 'User not found');
        else res.send(user);
    };

    public getAllUsers = async (_req: Request, res: Response) => {
        const users: User[] | null = await this.UserService.getAllUsers();

        res.send(users);
    };

    public getUserByNameAndPassword = async (req: Request, res: Response) => {
        const name = req.params.name;
        const password = req.params.password;
        const user: User | null = await this.UserService.getUserByNameAndPassword(name, password);
        if (!user) throw new ServiceError(404, 'User not found');
        else res.send(user);
    };
}
