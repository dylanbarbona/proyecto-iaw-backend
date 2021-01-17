import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Category extends Document {
  @Prop({ nullable: false, unique: true })
  name: string

  @Prop({ nullable: false })
  description: string
}

export const CategorySchema = SchemaFactory.createForClass(Category);