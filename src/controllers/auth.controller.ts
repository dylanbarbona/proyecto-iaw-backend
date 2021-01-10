import { Controller, Post, Get, Put, Delete, Param, Body, Query, Req, Res, HttpCode, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from '../inputs/user.input';
import { UserDTO } from '../dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { EncryptPasswordPipe } from '../pipes/encrypt-password.pipe';
import { User } from '../models/user.model';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService){ }

    @Post('login')
    async login(
        @Body() input: { username: string, password: string }, 
        @Req() req: Request, 
        @Res({ passthrough: true }) res: Response) {
            try {
                const user = await this.authService.validateUser(input.username, input.password)
                const { token } = await this.authService.login(user['_doc'])
                res.cookie('access_token', token, { httpOnly: true })
                    .status(HttpStatus.CREATED)
                    .json({ ok: true })
            }catch(error) {
                res.status(HttpStatus.UNAUTHORIZED).json({ ok: false })
            }
    }

    @Post('register')
    async register(
        @Body(EncryptPasswordPipe) input: CreateUserInput, 
        @Req() req: Request, 
        @Res({ passthrough: true }) res: Response){
            try {
                const user = await this.userService.create(input)
                user.password = ':)'
                const { token } = await this.authService.login(user['_doc'])
                res.cookie('access_token', token, { httpOnly: true })
                    .status(HttpStatus.CREATED)
                    .json({ ok: true })
            }catch(error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ ok: false })
            }
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(
        @Req() req: Request, 
        @Res({ passthrough: true }) res: Response){
            res.clearCookie('access_token')
                .status(HttpStatus.OK)
                .json({ ok: true })
    }
}
