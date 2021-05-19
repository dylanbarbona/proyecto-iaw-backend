import { Controller, Get, Post, UseGuards, Param, Req, UseInterceptors, Query } from '@nestjs/common';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { FollowService } from '../services/follow.service';
import { Request } from 'express';
import { FollowNotificationInterceptor } from 'src/interceptors/follow-notification.interceptor';

@Controller('user')
export class FollowController {
    constructor(private readonly followService: FollowService){}

    @Get('/followers/:username')
    async getFollowers(@Param('username') username: string, @Query('limit') limit: number, @Query('skip') skip: number){
        limit = Number(limit)
        skip = Number(skip)
        return { followers: await this.followService.getFollowers(username, { limit, skip }) }
    }

    @Get('/followings/:username')
    async getFollowings(@Param('username') username: string, @Query('limit') limit: number, @Query('skip') skip: number){
        limit = Number(limit)
        skip = Number(skip)
        return { followings: await this.followService.getFollowings(username, { limit, skip }) }
    }

    @Post('/follow/:username')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FollowNotificationInterceptor)
    async follow(@Req() req, @Param('username') username: string){
        const { loggedUser, user } = await this.followService.follow(req.user._id, username)
        if(!user)
            return await this.followService.unfollow(req.user._id, username)
        return { loggedUser, user }
    }
}
