import { Controller, Post, UseGuards, UseInterceptors, Body, Param, Req, Delete, Get, Query, Put } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCommentInput } from '../inputs/comment.input';
import { Request } from 'express'
import { Order } from '../utils/utils';
import { CommentNotificationInterceptor } from '../interceptors/comment-notification.interceptor';

@Controller('post')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @Get(':id/comments')
    async get(@Param('id') _id: string){
        return { comments: await this.commentService.get(_id) }
    }

    @Post(':id/comment')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(CommentNotificationInterceptor)
    async create(@Param('id') _id: string, @Req() req: Request, @Body() input: CreateCommentInput){
        input.user = req.user['_id']
        return await this.commentService.create(_id, input)
    }

    @Put(':id/comment/:id_comment')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('id') _id: string, @Param('id_comment') id_comment, @Req() req: Request, @Body() input: CreateCommentInput){
        input.user = req.user['_id']
        return { comments: await this.commentService.update(_id, { _id: id_comment, user: req.user['_id'] }, input) }
    }

    @Delete(':id/comment/:id_comment')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('id') _id: string, @Param('id_comment') id_comment: string, @Req() req: Request){
        return { comments: await this.commentService.delete(_id, { user: req.user['_id'], _id: id_comment }) }
    }
}
