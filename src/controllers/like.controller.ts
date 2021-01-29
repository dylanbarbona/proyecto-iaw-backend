import { Controller, Get, Post, Param, UseGuards, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { LikeService } from '../services/like.service';
import { PostService } from '../services/post.service';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { LikeInput } from '../inputs/like.input';

@Controller('post')
export class LikeController {
    constructor(
        private readonly postService: PostService,
        private readonly likeService: LikeService){}

    @Get(':id/likes')
    async get(@Param('id') _id){
        const post = await this.postService.get({ _id })
        const likes = await this.likeService.get(post)
        return { likes }
    }

    @Post(':id/likes')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async like(@Param('id') _id: string, @Req() req: Request, @Body() input: LikeInput){
        input.user = req.user['_id']
        const post = await this.postService.get({ _id })
        const likes = await this.likeService.like(post, input)
        return { likes }
    }
}
