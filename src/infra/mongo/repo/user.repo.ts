import mongoose from 'mongoose';
import { IUserDal } from '../../../interfaces/DAL/userDal.interface';

import User from '../../../types/user.type';
import { BaseRepository } from './baseRepository';

export class UserRepo extends BaseRepository<User> implements IUserDal {
    private UserModel: mongoose.Model<User>;

    public getById = async (userId: string): Promise<User | null> => {
        const user = await this.UserModel.findById(userId, { password: 0 });
        return user;
    };

    public create = async (user: User): Promise<User> => {
        const newUser = await this.UserModel.create(user);
        return newUser;
    };

    public updateName = async (userId: string, name: string): Promise<User | null> => {
        const user = await this.UserModel.findByIdAndUpdate(userId, { name }, { new: true });
        return user;
    };

    public delete = async (userId: string): Promise<User | null> => {
        const user = await this.UserModel.findByIdAndDelete({ _id: userId });
        return user;
    };

    public get = async (userId: string): Promise<User | null> => {
        const user = await this.UserModel.findById(userId, { password: 0 });
        return user;
    };

    public getByNameAndPassword = async (name: string, password: string): Promise<User | null> => {
        const user = await this.UserModel.findOne({ name, password }, { password: 0 });
        return user;
    };
}
