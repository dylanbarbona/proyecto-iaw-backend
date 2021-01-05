import { Injectable, UseInterceptors, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from '../inputs/user.input';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') readonly userModel: Model<User>){ }

    async getAll(search: SearchUserInput): Promise<User[]>{
        return await this.userModel.find({ 
            name: { $regex:  `${search.name}` },
            username: { $regex:  `${search.username}` },
            email: { $regex:  `${search.email}` },
            birthday: { $gte: search.birthday_min, $lt: search.birthday_max }
        }, { password: 0 }, { limit: search.limit, skip: search.skip })
    }

    async getById(id: string): Promise<User>{
        return await this.userModel.findById(id)
    }

    async getByUsername(username: string): Promise<User>{
        return await this.userModel.findOne({ username })
    }

    async create(input: CreateUserInput): Promise<User>{
        return await new this.userModel(input).save()
    }

    async update(id: string, input: UpdateUserInput): Promise<User>{
        return await this.userModel.findByIdAndUpdate(id, input, { new: true, useFindAndModify: false })
    }

    async delete(id: string): Promise<User>{
        return await this.userModel.findByIdAndRemove(id)
    }
}