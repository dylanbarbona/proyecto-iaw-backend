import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { ServicesModule } from 'src/services/services.module';

@Module({
    imports: [ServicesModule],
    providers: [NotificationGateway],
})
export class GatewaysModule {}