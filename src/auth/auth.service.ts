import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';
import { CreateUserInput, SearchUserInput } from 'src/inputs/user.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService) {}

    async validateUser(username: string = "", email: string = "", password: string): Promise<UserDTO> {
        return await this.userService.login({ username, email }, password)
    }

    async login(user: SearchUserInput) {
        return { token: this.jwtService.sign(user) };
    }

    async register(user: CreateUserInput) {
        const newUser = await this.userService.create(user)
        return this.login(newUser)
    }

    async validateToken(token: string): Promise<{ isValid: boolean; user?: UserDTO }> {
        try {
          const { _id } = this.jwtService.verify(token);
          const user = await this.userService.get({ _id });
          return { user, isValid: true };
        } catch (e) {
          return { isValid: false };
        }
    }
}