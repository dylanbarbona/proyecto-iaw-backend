import { Module } from '@nestjs/common';

import { ServicesModule } from '../services/services.module';
import { ModelsModule } from '../models/models.module';
import { UserService } from '../services/user.service';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

import { UserController } from './user.controller';
import { AuthController } from './auth.controller';

@Module({
    imports: [ 
        ModelsModule,
        ServicesModule,
        AuthModule,
        CloudinaryModule
    ],
    controllers: [
        AuthController,
        UserController
    ]
})
export class ControllersModule {}
