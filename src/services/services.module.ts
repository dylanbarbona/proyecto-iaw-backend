import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ModelsModule } from '../models/models.module';

@Module({
    imports: [
        ModelsModule
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class ServicesModule {}
