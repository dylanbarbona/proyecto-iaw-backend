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

let fs = require('fs')

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
    async update(@Body(EncryptPasswordPipe) { file, ...input }: UpdateUserInput, @Req() req: Request){
        const cloudinaryFile = await this.saveFiles(file) || { secure_url: 'NO_PHOTO' }
        return await this.userService.update({ _id: req.user['_id'] }, { ...input, profile_photo: cloudinaryFile.secure_url })
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    async delete(@Req() req: Request, @Res() res: Response){
        await this.userService.delete({ _id: req.user['_id'] })
        res.redirect('/auth/logout')
    }

    private async saveFiles(photo: string): Promise<CloudinaryFile>{
        const path = 'uploads/'
        const fileDecoded = this.decodeBase64Image(photo)
        let filename = new Date(Date.now()).getTime() + Math.random() + '.' + fileDecoded.format;
        fs.writeFileSync(path + filename, fileDecoded.data, 'base64')
        return await this.cloudinaryService.submitFile(path + filename, fileDecoded.resource_type)
    }

    private decodeBase64Image(dataString){
        const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        if (matches.length !== 3)
            throw new Error('Invalid input string');
        const format = matches[1].match(/.(gif|jpe?g|bmp|png)$/)[1]
        const resource_type = matches[1].split('/')[0]
        const data = Buffer.from(matches[2], 'base64')
        return { format, resource_type, data }
    }
}
