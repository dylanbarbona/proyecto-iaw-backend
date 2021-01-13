import { Injectable, UseInterceptors, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { CreateUserInput, SearchUserInput, UpdateUserInput, DeleteUserInput } from '../inputs/user.input';
import { UserDTO } from '../dto/user.dto';
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
    constructor(@InjectModel('User') readonly userModel: Model<User>){ }

    async getAll(search: SearchUserInput): Promise<UserDTO[]>{
        return await this.userModel.find({ 
            name: { $regex:  `${search.name}` },
            username: { $regex:  `${search.username}` },
            email: { $regex:  `${search.email}` },
            birthday: { $gte: search.birthday_min, $lt: search.birthday_max }
        },{ limit: search.limit, skip: search.skip })
    }

    async get(search: SearchUserInput): Promise<UserDTO>{
        return await this.userModel.findOne(search)
    }

    async login({ username, email }: SearchUserInput, pass: string): Promise<UserDTO> {
        const user = await this.userModel.findOne({ username }).select('+password')
        const isPasswordMatching = await bcrypt.compare(pass, user.password);

        if (!user || !isPasswordMatching)
            throw new UnauthorizedException()
        const { password, ...loggedUser } = user
        return loggedUser;
    }

    async create(input: CreateUserInput): Promise<UserDTO>{
        return await new this.userModel(input).save()
    }

    async update(search: SearchUserInput, input: UpdateUserInput): Promise<UserDTO>{
        return await this.userModel.findOneAndUpdate(search, input, { new: true, useFindAndModify: false })
    }

    async delete(search: SearchUserInput): Promise<UserDTO>{
        return await this.userModel.findOneAndDelete(search)
    }
}