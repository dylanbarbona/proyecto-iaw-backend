import { Controller, Get, UseGuards, Query, Param, Req, Body, Post, Put } from '@nestjs/common';
import { CollectionService } from '../services/collection.service';
import { JwtAuthGuard, Roles } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../models/user.model';
import { SearchCollectionInput, CreateCollectionInput } from '../inputs/collection.input';

@Controller('collections')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService){}

    @Get()
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAll(@Req() req){
        return await this.collectionService.getAll({ user: req.user['_id'] })
    }

    @Get(':id')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async get(@Param('id') _id, @Req() req){
        return await this.collectionService.getAll({ _id, user: req.user['_id'] })
    }

    @Post()
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() input: CreateCollectionInput, @Req() req){
        input.user = req.user['_id']
        return await this.collectionService.create(input)
    }

    @Put(':id/add/:post')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async addPost(@Param('id') _id, @Param('post') post, @Body() input: CreateCollectionInput, @Req() req){
        return await this.collectionService.addPost({ _id, user: req.user['_id'] }, { post })
    }

    @Put(':id/remove/:post')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async removePost(@Param('id') _id, @Param('post') post, @Body() input: CreateCollectionInput, @Req() req){
        return await this.collectionService.removePost({ _id, user: req.user['_id'] }, { post })
    }
}
