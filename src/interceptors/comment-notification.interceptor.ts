import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationGateway } from '../gateways/notification.gateway';
import { Post } from '../models/post.model';
import { NotificationService } from 'src/services/notification.service';
import { NotificationEnum } from 'src/models/notification.model';

@Injectable()
export class CommentNotificationInterceptor implements NestInterceptor {
    private LIMIT = 25

    constructor(
        private readonly notificationService: NotificationService,
        private readonly notificationGateway: NotificationGateway){ }
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async (post) => {
                const notification = await this.createNotification(post)
                const value = await this.getLastComment(post)
                this.notificationGateway.sendNotification(post.user._id, notification, value)
            })
        );
    }

    async createNotification(post){
        const from = post.comments[post.comments.length - 1].user._id
        const to = post.user._id
        const origin = post._id
        const type = NotificationEnum.COMMENT
        const search = { to, origin, type }
        const input = { from, to,  origin, type, viewed: false }
        return await this.notificationService.create(search, input)
    }

    async getLastComment(post){
        return post.comments[post.comments.length - 1]
    }
}