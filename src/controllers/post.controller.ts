import { Controller, Query, Res, Get, HttpStatus, Param, Post, UseGuards, Body, Delete, Req, Put, UseInterceptors, UploadedFiles, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { SearchPostInput, CreatePostInput, UpdatePostInput } from '../inputs/post.input';

import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../models/user.model';

import { PostService } from '../services/post.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly cloudinaryService: CloudinaryService){}

    @Get()
    async findAll(@Query() search: SearchPostInput){ 
        return await this.postService.getAll(search)
    }

    @Get(':id')
    async findOne(@Param('id') _id: string){
        return await this.postService.get({ _id })
    }

    @Post()
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FilesInterceptor("files", Number.MAX_VALUE, { dest: "./uploads" }))
    async create(@Body() input: CreatePostInput, @UploadedFiles() files, @Req() req: Request){
        const { urls } = await this.submitFiles(files)
        input.user = req.user['_id']
        input.urls = urls
        return await this.postService.create(input)
    }

    @Put(':id')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FilesInterceptor("files", Number.MAX_VALUE, { dest: "./uploads" }))
    async update(@Param('id') _id: string, @Body() input: UpdatePostInput, @UploadedFiles() files: File[], @Req() req: Request){
        const { urls } = await this.submitFiles(files)
        input.urls = urls
        input.user = req.user['_id']
        return await this.postService.update({ _id, user: req.user['_id'] }, input)
    }

    @Delete(':id')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async remove(@Param('id') _id: string, @Req() req: Request){
        return await this.postService.delete({ _id, user: req.user['_id'] })
    }

    private async submitFiles(files: File[]): Promise<{ urls: string[] }>{
        let cloudinaryUrls: string[] = []
        for(const file in files){
            const cloudFile = await this.cloudinaryService.submitFile(file)
            cloudinaryUrls.push(cloudFile.secure_url)
        }
        return { urls: cloudinaryUrls }
    }
}
