import { Module } from '@nestjs/common';
import { ModelsModule } from '../models/models.module';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { CollectionService } from './collection.service';
import { CommentService } from './comment.service';
import { FollowService } from './follow.service';
import { LikeService } from './like.service';
import { NotificationService } from './notification.service';
import { PostService } from './post.service';

@Module({
    imports: [
        ModelsModule
    ],
    providers: [
        UserService,
        CategoryService,
        CollectionService,
        CommentService,
        FollowService,
        LikeService,
        NotificationService,
        PostService
    ],
    exports: [
        UserService,
        CategoryService,
        CollectionService,
        CommentService,
        FollowService,
        LikeService,
        NotificationService,
        PostService
    ]
})
export class ServicesModule {}
