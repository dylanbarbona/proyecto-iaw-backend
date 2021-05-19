import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NotificationGateway } from '../gateways/notification.gateway';
import { Post } from '../models/post.model';
import { NotificationService } from '../services/notification.service';
import { NotificationEnum } from '../models/notification.model';

@Injectable()
export class LikeNotificationInterceptor implements NestInterceptor {
    private LIMIT = 3

    constructor(
        private readonly notificationService: NotificationService,
        private readonly notificationGateway: NotificationGateway){ }
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async (post) => {
                const value = this.getLastLikes(post)
                if(value.length > 0){
                    const notification = await this.createNotification(post)
                    this.notificationGateway.sendNotification(post.user._id, notification, value)
                }
            }),
            map(post => post.likes[post.likes.length - 1])
        );
    }

    async createNotification(post){
        const to = post.user._id
        const origin = post._id
        const type = NotificationEnum.LIKE
        const search = { to, origin, type }
        const input = { to,  origin, type, viewed: false }
        return await this.notificationService.create(search, input)
    }

    getLastLikes(post){
        const length = post.likes.length
        return {
            length,
            likes: post.likes.slice(-this.LIMIT)
        }
    }
}