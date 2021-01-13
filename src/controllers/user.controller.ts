import { Controller, Post, Get, Put, Delete, Param, Body, Query, Req, Res, HttpCode, HttpStatus, UseGuards, UseInterceptors, UploadedFile, UsePipes, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard, Roles } from '../auth/jwt.guard';
import { UserService } from '../services/user.service';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from '../inputs/user.input';
import { UserDTO } from '../dto/user.dto';
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

    @Post()
    async findAll(@Body() search: SearchUserInput, @Res() res: Response){
        res.status(HttpStatus.OK).json(await this.userService.getAll(search))
    }
    
    @Get(':id')
    async findOne(@Param('id') _id: string, @Res() res: Response){
        res.status(HttpStatus.OK).json(await this.userService.get({ _id }))
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file", { dest: "./uploads" }))
    async update(@Body(EncryptPasswordPipe) input: UpdateUserInput, @UploadedFile() file, @Req() req, @Res() res: Response){
        const { profile_photo } = await this.submitProfilePhoto(file)
        res.status(HttpStatus.OK).json(await this.userService.update({ _id: req.user._id }, { ...input, profile_photo}))
    }

    @Delete()
    //@Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async remove(@Req() req, @Res() res: Response){
        res.status(HttpStatus.OK).json(await this.userService.delete({ _id: req.user._id }))
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async whoAmI(@Req() req, @Res() res: Response){
        res.status(HttpStatus.OK).json(req.user)
    }

    private async submitProfilePhoto(file: File): Promise<{ profile_photo: string }>{
        if(!file)
            return { profile_photo: 'NO_PHOTO' }
        let cloudFile = await this.cloudinaryService.submitFile(file)
        return { profile_photo: cloudFile.secure_url }
    }
}
