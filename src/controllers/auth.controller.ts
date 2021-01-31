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
        @Body() input: { username: string, email: string, password: string }, 
        @Req() req: Request, 
        @Res({ passthrough: true }) res: Response) {
            const user = await this.authService.validateUser(input.username, input.email, input.password)
            const { token } = await this.authService.login(user['_doc'])
            res.cookie('access_token', token, { httpOnly: true }).status(HttpStatus.CREATED).json({ ok: true })
    }

    @Post('register')
    async register(
        @Body(EncryptPasswordPipe) input: CreateUserInput, 
        @Req() req: Request, 
        @Res({ passthrough: true }) res: Response){
            const user = await this.userService.create(input)
            const { token } = await this.authService.login(user['_doc'])
            res.cookie('access_token', token, { httpOnly: true }).status(HttpStatus.CREATED).json({ ok: true })
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(
        @Req() req: Request, 
        @Res({ passthrough: true }) res: Response){
            res.clearCookie('access_token').status(HttpStatus.OK).json({ ok: true })
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async whoAmI(@Req() req: Request, @Res() res: Response){
        res.status(HttpStatus.OK).json(await this.userService.get({ _id: req.user['_id'] }))
    }
}
