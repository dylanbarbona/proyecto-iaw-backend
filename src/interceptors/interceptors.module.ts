import { Module } from '@nestjs/common';
import { CommentNotificationInterceptor } from './comment-notification.interceptor';
import { GatewaysModule } from '../gateways/gateways.module';
import { ServicesModule } from '../services/services.module';

@Module({
    imports: [
        ServicesModule,
        GatewaysModule
    ],
    providers: [
        CommentNotificationInterceptor
    ],
    exports: [
        CommentNotificationInterceptor
    ]
})
export class InterceptorsModule {}
