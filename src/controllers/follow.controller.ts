import { Controller, Get, Post, UseGuards, Param, Req } from '@nestjs/common';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { FollowService } from '../services/follow.service';
import { Request } from 'express';

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
    async follow(@Req() req, @Param('username') username: string){
        return { followings: await this.followService.follow(req.user.username, username) }
    }

    @Post(':username/unfollow')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async unfollow(@Req() req, @Param('username') username: string){
        return { followings: await this.followService.unfollow(req.user.username, username) }
    }
}
