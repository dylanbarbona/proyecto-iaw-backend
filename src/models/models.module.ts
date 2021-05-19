import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.model';
import { CategorySchema } from './category.model';
import { PostSchema } from './post.model';
import { NotificationSchema } from './notification.model';
import { CollectionSchema } from './collection.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema}]),
        MongooseModule.forFeature([{ name: "Post", schema: PostSchema }]),
        MongooseModule.forFeature([{ name: "Notification", schema: NotificationSchema}]),
        MongooseModule.forFeature([{ name: "Collection", schema: CollectionSchema}]),
    ],
    exports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema}]),
        MongooseModule.forFeature([{ name: "Post", schema: PostSchema }]),
        MongooseModule.forFeature([{ name: "Collection", schema: CollectionSchema}]),
    ]
})
export class ModelsModule {}
