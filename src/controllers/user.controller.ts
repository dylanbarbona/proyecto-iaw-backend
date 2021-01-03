import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO, SearchUserDTO, UpdateUserDTO } from '../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){ }

    @Post()
    async create(@Body() createUserDTO: CreateUserDTO) {
        return await this.userService.create(createUserDTO)
    }

    @Get()
    async findAll(@Query() query: SearchUserDTO) {
        return await this.userService.getAll(query)
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.get(id)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
        return await this.userService.update(id, updateUserDTO)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.delete(id)
    }
}
