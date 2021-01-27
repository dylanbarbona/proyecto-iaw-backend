import { Module } from '@nestjs/common';
import { ModelsModule } from '../models/models.module';

import { UserService } from './user.service';
import { PostService } from './post.service';
import { CategoryService } from './category.service';
import { CollectionService } from './collection.service';
import { CommentService } from './comment.service';
import { FollowService } from './follow.service';
import { NotificationService } from './notification.service';

@Module({
    imports: [
        ModelsModule
    ],
    providers: [
        UserService,
        PostService,
        CategoryService,
        CollectionService,
        CommentService,
        FollowService,
        NotificationService
    ],
    exports: [
        UserService,
        PostService,
        CategoryService,
        CollectionService,
        CommentService,
        FollowService,
        NotificationService
    ]
})
export class ServicesModule {}
