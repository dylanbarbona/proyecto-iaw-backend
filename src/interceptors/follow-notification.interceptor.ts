import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NotificationGateway } from '../gateways/notification.gateway';
import { Post } from '../models/post.model';
import { NotificationService } from '../services/notification.service';
import { NotificationEnum } from '../models/notification.model';

@Injectable()
export class FollowNotificationInterceptor implements NestInterceptor {
    private LIMIT = 3

    constructor(
        private readonly notificationService: NotificationService,
        private readonly notificationGateway: NotificationGateway){ }
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async ({ loggedUser, user }) => {
                const value = await this.getLastFollows(user)
                if(value.length > 0){
                    const notification = await this.createNotification(user, loggedUser)
                    this.notificationGateway.sendNotification(user._id, notification, value)
                }
            }),
            map(({ loggedUser, user }) => { return { following: loggedUser.followings.slice(-1) }})
        );
    }

    async createNotification(user, loggedUser){
        const to = user._id
        const origin = loggedUser._id
        const type = NotificationEnum.FOLLOW
        const search = { to, origin, type }
        const input = { to,  origin, type, viewed: false }
        return await this.notificationService.create(search, input)
    }

    async getLastFollows(user){
        return {
            length: user.followers.length,
            followers: user.followers.slice(-this.LIMIT),
        }
    }
}