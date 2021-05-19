import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment, Comments } from './comment.model';
import { Likes, Like } from './like.model';
import { Metadata, MetadataSchema } from './metadata.model';

@Schema({ timestamps: true, versionKey: false })
export class Post extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, autopopulate: true })
    user: string
  
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true, autopopulate: true }])
    categories: string[]

    @Prop({ default: "" })
    description: string

     @Prop({ type: [MetadataSchema]})
    metadata: Metadata[]

    @Prop({ type: [Comments] })
    comments: Comment[]

    @Prop({ type: [Likes], default: [] })
    likes: Like[]
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ description: 'text' }, { weights: { description: 1 } });