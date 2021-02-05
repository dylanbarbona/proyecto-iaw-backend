import { Controller, Post, UseGuards, Res, HttpStatus, Body, Get, Query, Param, Put, Delete, Req } from '@nestjs/common';
import { Response } from 'express'
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { NotificationService } from '../services/notification.service';
import { SearchNotificationInput, CreateNotificationInput, UpdateNotificationInput } from '../inputs/notification.input';

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

    @Post()
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() input: CreateNotificationInput, @Req() req){
        input.to = req.user['_id']
        return await this.notificationService.create(input)
    }

    @Put('id')
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('id') _id: string, @Body() input: UpdateNotificationInput, @Req() req){
        return await this.notificationService.update({ _id, to: req.user['_id'] }, input)
    }

    @Delete('id')
    @Roles(Role.ADMIN_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('id') _id: string, @Req() req){
        return await this.notificationService.delete({ _id, user: req.user['_id'] })
    }
}
