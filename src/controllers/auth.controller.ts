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
    private XSRF_TOKEN = 'XSRF-TOKEN';

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService){ }

    @Get()
    async getCsrfToken(@Req() req, @Res() res){
        let token = req.cookies[this.XSRF_TOKEN]
        if(!token){
            token = req.csrfToken()
            res.cookie(this.XSRF_TOKEN, token)
        }
        res.json({ ok: true })
    }

    @Post('login')
    async login(
        @Body() input: { username: string, email: string, password: string }, 
        @Req() req, 
        @Res({ passthrough: true }) res: Response) {
            const user = await this.authService.validateUser(input.username, input.email, input.password)
            const expires = new Date(new Date().setMonth(new Date().getMonth() + 1))
            const { access_token } = await this.authService.login(user['_doc'])
            res.status(HttpStatus.CREATED)
                .cookie('Authorization', access_token, { expires })
                .json({ ok: true, user })
    }

    @Post('register')
    async register(
        @Body(EncryptPasswordPipe) input: CreateUserInput, 
        @Req() req, 
        @Res({ passthrough: true }) res: Response){
            const user = await this.userService.create(input)
            const expires = new Date(new Date().setMonth(new Date().getMonth() + 1))
            const { access_token } = await this.authService.login(user['_doc'])
            res.status(HttpStatus.CREATED)
                .cookie('Authorization', access_token, { expires })
                .json({ ok: true, user })
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(
        @Req() req: Request, 
        @Res({ passthrough: true }) res: Response){
            res.status(HttpStatus.OK).clearCookie('Authorization')
            .json({ ok: true })
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async whoAmI(@Req() req: Request, @Res() res: Response){
        res.status(HttpStatus.OK).json(await this.userService.get({ _id: req.user['_id'] }))
    }

    @Get('check')
    @UseGuards(JwtAuthGuard)
    async check(@Req() req: Request, @Res() res: Response){
        { ok: req.user != null }
    }
}
