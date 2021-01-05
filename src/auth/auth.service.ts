const bcrypt = require('bcrypt')
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.getByUsername(username)
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (user && isPasswordMatching) {
            user.password = ':)'
            return user;
        }
        return null;
    }

    async login(user: User) {
        return { token: this.jwtService.sign({ user }) };
    }

    async register(user: User) {
        const newUser = await this.userService.create(user)
        return this.login(newUser)
    }

    async validateToken(token: string): Promise<{ isValid: boolean; user?: User }> {
        try {
          const { _id } = this.jwtService.verify(token);
          const user = await this.userService.getById(_id);
          return { user, isValid: true };
        } catch (e) {
          return { isValid: false };
        }
    }
}