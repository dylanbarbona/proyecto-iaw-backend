import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ServicesModule } from 'src/services/services.module';
import { ModelsModule } from 'src/models/models.module';
import { UserService } from 'src/services/user.service';

@Module({
    imports: [ 
        ModelsModule,
        ServicesModule
    ],
    controllers: [UserController]
})
export class ControllersModule {}
