import { Controller, Get, Post, Param, UseGuards, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { LikeService } from '../services/like.service';
import { PostService } from '../services/post.service';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { CreateLikeInput, UpdateLikeInput } from '../inputs/like.input';

@Controller('post')
export class LikeController {
    constructor(private readonly likeService: LikeService){}

    @Get(':id/likes')
    async get(@Param('id') _id: string){
        return { likes: await this.likeService.get(_id) }
    }

    @Post(':id/like')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async like(@Param('id') _id: string, @Req() req: Request, @Body() input: CreateLikeInput){
        input.user = req.user['_id']
        return { likes: await this.likeService.like(_id, input) }
    }

    @Post(':id/unlike')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async unlike(@Param('id') _id: string, @Req() req: Request, @Body() input: UpdateLikeInput){
        input.user = req.user['_id']
        return { likes: await this.likeService.unlike(_id, input) }
    }
}
