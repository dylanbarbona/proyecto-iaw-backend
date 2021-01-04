import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ServicesModule } from 'src/services/services.module';
import { ModelsModule } from 'src/models/models.module';
import { UserService } from 'src/services/user.service';
import { AuthController } from './auth.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [ 
        ModelsModule,
        ServicesModule,
        AuthModule
    ],
    controllers: [
        AuthController,
        UserController
    ]
})
export class ControllersModule {}
