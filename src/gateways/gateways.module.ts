import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { ServicesModule } from 'src/services/services.module';

@Module({
    providers: [NotificationGateway],
    exports: [NotificationGateway]
})
export class GatewaysModule {}