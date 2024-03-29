import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { ServicesModule } from '../services/services.module';
import { ModelsModule } from '../models/models.module';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { CategoryController } from './category.controller';
import { CollectionController } from './collection.controller';
import { PostController } from './post.controller';
import { NotificationController } from './notification.controller';
import { LikeController } from './like.controller';
import { FollowController } from './follow.controller';
import { CommentController } from './comment.controller';
import { InterceptorsModule } from '../interceptors/interceptors.module';
import { GatewaysModule } from '../gateways/gateways.module';

var csrf = require('csurf');

@Module({
    imports: [ 
        ModelsModule,
        ServicesModule,
        AuthModule,
        CloudinaryModule,
        InterceptorsModule,
        GatewaysModule
    ],
    controllers: [
        AuthController,
        UserController,
        CategoryController,
        CollectionController,
        PostController,
        NotificationController,
        LikeController,
        FollowController,
        CommentController
    ]
})
export class ControllersModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(csrf({ cookie: { key: '_csrf', httpOnly: true } }))
          .forRoutes({ path: '/auth', method: RequestMethod.GET })
          //.forRoutes(AuthController, UserController, CategoryController, CollectionController, PostController, NotificationController, LikeController, FollowController, CommentController)
      }
}

