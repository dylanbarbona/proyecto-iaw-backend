import { Injectable, UseInterceptors, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from '../inputs/user.input';
import { EMPTY_STRING, MAX_DATE, MIN_DATE, LIMIT, SKIP } from '../utils/utils'

const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
    constructor(@InjectModel('User') readonly userModel: Model<User>){ }

    async getAll(search: SearchUserInput): Promise<User[]>{
        return await this.userModel.find({ 
            name: { $regex:  `${search.name || EMPTY_STRING}` },
            username: { $regex:  `${search.username || EMPTY_STRING}` },
            email: { $regex:  `${search.email || EMPTY_STRING}` },
            birthday: { 
                $gte: search.birthday_min || MIN_DATE, 
                $lt: search.birthday_max || MAX_DATE 
            }
        }).limit(Number(search.limit) || LIMIT).skip(Number(search.skip) || SKIP)
    }

    async get(search: SearchUserInput): Promise<User>{
        return await this.userModel.findOne(search)
    }

    async login({ username, email }: SearchUserInput, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ username }).select('+password')
        if(!user)
            throw new UnauthorizedException()
        const isPasswordMatching = await bcrypt.compare(pass, user.password);

        if (!isPasswordMatching)
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