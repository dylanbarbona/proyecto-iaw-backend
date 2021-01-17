import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Post extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', autopopulate: true })
  user: string
  
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Category', autopopulate: true }])
  categories: string[]

  @Prop()
  description: string

  @Prop([{ type: MongooseSchema.Types.Array }])
  urls: string[]
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ name: "description", "description": 'text' })