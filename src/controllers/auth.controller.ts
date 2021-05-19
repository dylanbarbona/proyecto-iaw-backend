import { Controller, Post, Get, Put, Delete, Param, Body, Query, Req, Res, HttpCode, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from '../inputs/user.input';
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

    @Get()
    async getCsrfToken(@Req() req, @Res() res){
        let token = req.cookies['XSRF-TOKEN']
        if(!token){
            token = req.csrfToken()
            res.cookie('XSRF-TOKEN', token).json({ 'XSRF-TOKEN': token });
        }
        res.json({ 'XSRF-TOKEN': token });
    }

    @Post('login')
    async login(
        @Body() input: { username: string, email: string, password: string }, 
        @Req() req, 
        @Res({ passthrough: true }) res: Response) {
            const user = await this.authService.validateUser(input.username, input.email, input.password)
            const { access_token } = await this.authService.login(user['_doc'])
            res.cookie('access_token', access_token, { httpOnly: true }).status(HttpStatus.CREATED).json({ access_token })
    }

    @Post('register')
    async register(
        @Body(EncryptPasswordPipe) input: CreateUserInput, 
        @Req() req: Request, 
        @Res({ passthrough: true }) res: Response){
            const user = await this.userService.create(input)
            const { access_token } = await this.authService.login(user['_doc'])
            res.cookie('access_token', access_token, { httpOnly: true }).status(HttpStatus.CREATED).json({ access_token })
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

    @Get('check')
    @UseGuards(JwtAuthGuard)
    async check(@Req() req: Request, @Res() res: Response){
        return req.user ? { token: this.authService.getToken(req.user as User), error: false } : { error: true }
    }
}
