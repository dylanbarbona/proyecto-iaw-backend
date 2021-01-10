import { Module } from '@nestjs/common';

import { ServicesModule } from '../services/services.module';
import { ModelsModule } from '../models/models.module';
import { UserService } from '../services/user.service';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { PostController } from './post.controller';
import { CategoryController } from './category.controller';
import { CollectionController } from './collection.controller';
import { CommentController } from './comment.controller';
import { FollowController } from './follow.controller';
import { LikeController } from './like.controller';
import { NotificationController } from './notification.controller';

@Module({
    imports: [ 
        ModelsModule,
        ServicesModule,
        AuthModule,
        CloudinaryModule
    ],
    controllers: [
        AuthController,
        UserController,
        PostController,
        CategoryController,
        CollectionController,
        CommentController,
        FollowController,
        LikeController,
        NotificationController
    ]
})
export class ControllersModule {}
