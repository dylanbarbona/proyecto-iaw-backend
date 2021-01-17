import { Injectable, UseInterceptors, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from '../inputs/user.input';
import { UserDTO } from '../dto/user.dto';
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
    private readonly EMPTY_STRING = ''
    private readonly MAX_DATE = new Date(8640000000000000);
    private readonly MIN_DATE = new Date(-8640000000000000);
    private readonly LIMIT = 10
    private readonly SKIP = 0

    constructor(@InjectModel('User') readonly userModel: Model<User>){ }

    async getAll(search: SearchUserInput): Promise<User[]>{
        return await this.userModel.find({ 
            name: { $regex:  `${search.name || this.EMPTY_STRING}` },
            username: { $regex:  `${search.username || this.EMPTY_STRING}` },
            email: { $regex:  `${search.email || this.EMPTY_STRING}` },
            birthday: { 
                $gte: search.birthday_min || this.MIN_DATE, 
                $lt: search.birthday_max || this.MAX_DATE 
            }
        }).limit(Number(search.limit) || this.LIMIT).skip(Number(search.skip) || this.SKIP)
    }

    async get(search: SearchUserInput): Promise<User>{
        return await this.userModel.findOne(search)
    }

    async login({ username, email }: SearchUserInput, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ username }).select('+password')
        const isPasswordMatching = await bcrypt.compare(pass, user.password);

        if (!user || !isPasswordMatching)
            throw new UnauthorizedException()
        user.password = ':)'
        return user
    }

    async create(input: CreateUserInput): Promise<User>{
        let user = await new this.userModel(input).save()
        user.password = ':)'
        return user
    }

    async update(search: SearchUserInput, input: UpdateUserInput): Promise<User>{
        return await this.userModel.findOneAndUpdate(search, input, { new: true, useFindAndModify: false })
    }

    async delete(search: SearchUserInput): Promise<User>{
        return await this.userModel.findOneAndDelete(search)
    }
}