import { Controller, Post, UseGuards, UseInterceptors, Body, Param, Req, Delete } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { Role } from '../models/user.model';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCommentInput } from '../inputs/comment.input';
import { Request } from 'express'

@Controller('post')
export class CommentController {
    constructor(
        private readonly postService: PostService,
        private readonly commentService: CommentService){}

    @Post(':id/comments')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Param('id') _id: string, @Req() req: Request, @Body() input: CreateCommentInput){
        input.user = req.user['_id']
        const post = await this.postService.get({ _id })
        return await this.commentService.create(post, input)
    }

    @Delete(':id/comments/:id_comment')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('id') _id: string, @Param('id_comment') id_comment: string, @Req() req: Request){
        const post = await this.postService.get({ _id })
        return await this.commentService.delete(post, { user: req.user['_id'], _id: id_comment })
    }
}
