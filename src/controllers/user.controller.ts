import { Controller, Post, Get, Put, Delete, Param, Body, Query, Req, Res, Request, Response, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserService } from '../services/user.service';
import { CreateUserInput, SearchUserInput, UpdateUserInput } from '../inputs/user.input';
import { UserDTO } from '../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){ }

    @Post()
    async create(@Body() create: CreateUserInput): Promise<UserDTO> {
        return await this.userService.create(create)
    }

    @Post('/search')
    async findAll(@Body() search: SearchUserInput): Promise<UserDTO[]> {
        return await this.userService.getAll(search)
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserDTO> {
        return await this.userService.getById(id)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() input: UpdateUserInput): Promise<UserDTO> {
        return await this.userService.update(id, input)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<UserDTO> {
        return await this.userService.delete(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async whoAmI(@Req() req){
        return req.user
    }
}
