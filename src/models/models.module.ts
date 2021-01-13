import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.model';
import { CategorySchema } from './category.model';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}]),
    ],
    exports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}]),
    ]
})
export class ModelsModule {}
