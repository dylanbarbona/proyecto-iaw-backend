import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NotificationGateway } from '../gateways/notification.gateway';
import { Post } from '../models/post.model';
import { NotificationService } from '../services/notification.service';
import { NotificationEnum } from '../models/notification.model';

@Injectable()
export class CommentNotificationInterceptor implements NestInterceptor {
    private LIMIT = 3

    constructor(
        private readonly notificationService: NotificationService,
        private readonly notificationGateway: NotificationGateway){ }
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async (post) => {
                const value = await this.getLastComments(post)
                if(value.length > 0){
                    const notification = await this.createNotification(post)
                    this.notificationGateway.sendNotification(post.user._id, notification, value)
                }
            }),
            map(post => post.comments[post.comments.length - 1])
        );
    }

    async createNotification(post){
        const to = post.user._id
        const origin = post._id
        const type = NotificationEnum.COMMENT
        const search = { to, origin, type }
        const input = { to,  origin, type, viewed: false }
        return await this.notificationService.create(search, input)
    }

    async getLastComments(post){
        return {
            length: post.comments.length,
            comments: post.comments.slice(-this.LIMIT),
        }
    }
}