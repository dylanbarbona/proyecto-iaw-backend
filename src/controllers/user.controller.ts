import { Controller, Post, Get, Put, Delete, Param, Body, Query, Req, Res, HttpCode, HttpStatus, UseGuards, UseInterceptors, UploadedFile, UsePipes, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard, Roles } from '../auth/jwt.guard';
import { UserService } from '../services/user.service';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from '../inputs/user.input';
import { EncryptPasswordPipe } from 'src/pipes/encrypt-password.pipe';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryFile } from '../cloudinary/cloudinary.interface';
import { Role } from 'src/models/user.model';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService){ }

    @Get()
    async findAll(@Query() search: SearchUserInput){
        return await this.userService.getAll(search)
    }

    @Get(':username')
    async findOne(@Param('username') username: string){
        return await this.userService.get({ username })
    }

    @Post()
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() input: CreateUserInput){
        return await this.userService.create(input)
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file", { dest: "./uploads" }))
    async update(@Body(EncryptPasswordPipe) input: UpdateUserInput, @UploadedFile() file, @Req() req: Request){
        const profile_photo = await this.submitProfilePhoto(file)
        return await this.userService.update({ _id: req.user['_id'] }, { ...input, profile_photo})
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    async delete(@Req() req: Request, @Res() res: Response){
        await this.userService.delete({ _id: req.user['_id'] })
        res.redirect('/auth/logout')
    }

    private async submitProfilePhoto(file: File): Promise<string>{
        if(!file)
            return 'NO_PHOTO'
        let cloudFile = await this.cloudinaryService.submitFile(file)
        return cloudFile.secure_url
    }
}
