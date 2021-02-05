import { Module } from '@nestjs/common';
import { CommentNotificationInterceptor } from './comment-notification.interceptor';
import { GatewaysModule } from '../gateways/gateways.module';
import { ServicesModule } from '../services/services.module';
import { LikeNotificationInterceptor } from './like-notification.interceptor';

@Module({
    imports: [
        ServicesModule,
        GatewaysModule
    ],
    providers: [
        CommentNotificationInterceptor,
        LikeNotificationInterceptor,
    ],
    exports: [
        CommentNotificationInterceptor,
        LikeNotificationInterceptor,
    ]
})
export class InterceptorsModule {}
