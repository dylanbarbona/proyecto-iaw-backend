import { Controller, Query, Get, Param, Post, UseGuards, Body, Delete, Req, Put, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';

import { SearchPostInput, CreatePostInput, UpdatePostInput } from '../inputs/post.input';

import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../models/user.model';

import { PostService } from '../services/post.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { DeletePhotosInterceptor } from '../interceptors/delete-photo.interceptor';
import { CloudinaryFile } from 'src/cloudinary/cloudinary.interface';
import { Metadata } from 'src/models/metadata.model';

let fs = require('fs')

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly cloudinaryService: CloudinaryService){}

    @Get('search/random')
    async findRandom(@Query() search: SearchPostInput){
        return await this.postService.getRandomPosts(search)
    }

    @Get('search/categories')
    async findByCategory(@Query() search: SearchPostInput){ 
        return await this.postService.getPostByCategory(search)
    }

    @Get('search/user')
    async findByUser(@Query() search: SearchPostInput){ 
        return await this.postService.getPostByUser(search)
    }

    @Get('search/description')
    async findByDescription(@Query() search: SearchPostInput){ 
        return await this.postService.getPostByDescription(search)
    }

    @Get('search/followings')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getFollowingPosts(@Query() search: SearchPostInput, @Req() req){ 
        let user_id = req.user['_id']
        return await this.postService.getFollowingPosts(user_id, search)
    }

    @Get(':id')
    async findOne(@Param('id') _id: string){
        return await this.postService.get({ _id })
    }

    @Post()
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() { files, ...input }: CreatePostInput, @Req() req){
        input.metadata = await this.saveFiles(files)
        input.user = req.user['_id']
        return await this.postService.create(input)
    }

    @Put(':id')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('id') _id: string, @Body() { addFiles, ...input }: UpdatePostInput, @Req() req){
        const metadata = await this.saveFiles(addFiles)
        input.deleteFiles.forEach(async public_id => await this.cloudinaryService.delete(public_id))
        input.metadata = metadata
        return await this.postService.update({ _id, user: req.user['_id'] }, input)
    }

    @Delete(':id')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(DeletePhotosInterceptor)
    async remove(@Param('id') _id: string, @Req() req: Request){
        return await this.postService.delete({ _id, user: req.user['_id'] })
    }

    private async saveFiles(photos: string[]): Promise<Metadata[]>{
        const path = 'uploads/'
        const filesDecoded = photos.map(photo => this.decodeBase64Image(photo))
        const metadataFiles = filesDecoded.map(({ format, resource_type, data }) => {
            let filename = new Date(Date.now()).getTime() + Math.random() + '.' + format;
            fs.writeFileSync(path + filename, data, 'base64');
            return { path: path+filename, resource_type }
        })

        let cloudinaryFiles: Metadata[] = []
        for(const { path, resource_type } of metadataFiles)
            cloudinaryFiles.push(await this.cloudinaryService.submitFile(path, resource_type))
        return cloudinaryFiles
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
