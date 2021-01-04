import { Controller, Post, Get, Put, Delete, Param, Body, Query, Req, Res, Request, Response, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from 'src/inputs/user.input';
import { UserDTO } from '../dto/user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService){ }

    @Post('login')
    async login(@Body() input: { username: string, password: string }): Promise<{ token: string }> {
        let user = await this.authService.validateUser(input.username, input.password)
        return await this.authService.login(user)
    }

    @Post('register')
    async register(@Body() input: CreateUserInput): Promise<{ token: string }> {
        let user = await this.userService.create(input)
        return await this.authService.login(user)
    }
}
