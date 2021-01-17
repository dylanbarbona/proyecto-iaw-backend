import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../services/user.service';
import { CreateUserInput, SearchUserInput } from '../inputs/user.input';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService) {}

    async validateUser(username: string = "", email: string = "", password: string): Promise<User> {
        return await this.userService.login({ username, email }, password)
    }

    async login(user: SearchUserInput) {
        return { token: this.jwtService.sign(user) };
    }

    async register(user: CreateUserInput) {
        return await this.userService.create(user)
    }

    async validateToken(token: string): Promise<{ isValid: boolean; user?: User }> {
        try {
          const { _id } = this.jwtService.verify(token);
          const user = await this.userService.get({ _id });
          return { user, isValid: true };
        } catch (e) {
          return { isValid: false };
        }
    }
}