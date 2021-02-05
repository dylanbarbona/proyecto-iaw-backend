import { Controller, Get, Post, UseGuards, Param, Req, UseInterceptors } from '@nestjs/common';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { FollowService } from '../services/follow.service';
import { Request } from 'express';
import { FollowNotificationInterceptor } from 'src/interceptors/follow-notification.interceptor';

@Controller('user')
export class FollowController {
    constructor(private readonly followService: FollowService){}

    @Get(':username/followers')
    async getFollowers(@Param('username') username: string){
        return { followers: await this.followService.getFollowers(username) }
    }

    @Get(':username/followings')
    async getFollowings(@Param('username') username: string){
        return { followings: await this.followService.getFollowings(username) }
    }

    @Post(':username/follow')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FollowNotificationInterceptor)
    async follow(@Req() req, @Param('username') username: string){
        const { loggedUser, user } = await this.followService.follow(req.user.username, username)
        if(!user)
            return await this.followService.unfollow(req.user.username, username)
        return { loggedUser, user }
    }
}
