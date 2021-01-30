import { Controller, Get, Post, UseGuards, Param, Req } from '@nestjs/common';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { UserService } from '../services/user.service';
import { FollowService } from '../services/follow.service';
import { Request } from 'express';

@Controller('user')
export class FollowController {
    constructor(
        private readonly userService: UserService,
        private readonly followService: FollowService){}

    @Get(':username/followers')
    async getFollowers(@Param('username') username: string){
        const user = await this.userService.get({ username })
        return await this.followService.getFollowers(user)
    }

    @Get(':username/followings')
    async getFollowings(@Param('username') username: string){
        const user = await this.userService.get({ username })
        return await this.followService.getFollowings(user)
    }

    @Post(':username/follow')
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async follow(@Req() req, @Param('username') username: string){
        const user = await this.userService.get({ username })
        return this.followService.follow(req.user, user)
    }
}
