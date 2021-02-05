import { Controller, Post, UseGuards, Res, HttpStatus, Body, Get, Query, Param, Put, Delete, Req } from '@nestjs/common';
import { Response } from 'express'
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { NotificationService } from '../services/notification.service';
import { SearchNotificationInput, CreateNotificationInput } from '../inputs/notification.input';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService){ }

    @Get()
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAll(@Query() search: SearchNotificationInput, @Req() req) {
        search.to = req.user['_id']
        return await this.notificationService.get(search)
    }

    @Delete('id')
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('id') _id: string, @Req() req){
        return await this.notificationService.delete({ _id, user: req.user['_id'] })
    }
}
