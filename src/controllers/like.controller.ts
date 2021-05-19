import { Controller, Get, Post, Param, UseGuards, Body, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { LikeService } from '../services/like.service';
import { PostService } from '../services/post.service';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { CreateLikeInput, UpdateLikeInput } from '../inputs/like.input';
import { LikeNotificationInterceptor } from '../interceptors/like-notification.interceptor';

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
    @UseInterceptors(LikeNotificationInterceptor)
    async like(@Param('id') _id: string, @Req() req: Request, @Body() input: CreateLikeInput){
        input.user = req.user['_id']
        const post = await this.likeService.like(_id, input)
        if(!post)
            return await this.likeService.unlike(_id, input)
        return post
    }
}
