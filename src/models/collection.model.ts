import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment, Comments } from './comment.model';
import { Likes, Like } from './like.model';
import { Metadata, MetadataSchema } from './metadata.model';

@Schema({ timestamps: true, versionKey: false })
export class Collection extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: string
  
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Post', required: true }])
    posts: string[]
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);