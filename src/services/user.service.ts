import { Injectable, UseInterceptors, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { UserInput } from '../inputs/user.input';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') readonly userModel: Model<User>){ }

    async getAll(input: UserInput): Promise<User[]>{
        return await this.userModel.find(input)
    }

    async get(id: string): Promise<User>{
        return await this.userModel.findById(id)
    }

    async create(input: UserInput): Promise<User>{
        return await new this.userModel(input).save()
    }

    async update(id: string, input: UserInput): Promise<User>{
        return await this.userModel.findByIdAndUpdate(id, input, { new: true, useFindAndModify: false })
    }

    async delete(id: string): Promise<User>{
        return await this.userModel.findByIdAndRemove(id)
    }
}