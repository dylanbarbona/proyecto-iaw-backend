import { Controller, Post, UseGuards, Res, HttpStatus, Body, Get, Query, Param, Put, Delete } from '@nestjs/common';
import { Response } from 'express'
import { CategoryService } from '../services/category.service';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCategoryInput, SearchCategoryInput } from '../inputs/category.input';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){ }

    @Get()
    async getAll(@Query() search: SearchCategoryInput) {
        return await this.categoryService.getAll(search)
    }

    @Get(':id')
    async get(@Param('id') _id: string) {
        return await this.categoryService.get({ _id })
    }

    @Post()
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() input: CreateCategoryInput){
        return await this.categoryService.create(input)
    }

    @Put('id')
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('id') _id: string, @Body() input: CreateCategoryInput){
        return await this.categoryService.update({ _id }, input)
    }

    @Delete('id')
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('id') _id: string){
        return await this.categoryService.delete({ _id })
    }
}
