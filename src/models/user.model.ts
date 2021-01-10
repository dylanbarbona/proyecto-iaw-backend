import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ nullable: false, unique: true })
  username: string

  @Prop({ nullable: false })
  name: string
  
  @Prop({ nullable: false, unique: true })
  email: string
  
  @Prop({ nullable: false, select: false })
  password: string
  
  @Prop({ type: Date, nullable: true })
  birthday: Date

  @Prop({ nullable: true, default: "NO_PHOTO" })
  profile_photo: string

  @Prop({ nullable: true })
  biography: string

  @Prop({ type: MongooseSchema.Types.Mixed, nullable: true, default: {} })
  social_networks: {
      facebook: string,
      instagram: string,
      twitter: string,
      youtube: string,
      linkedin: string
  }

  @Prop({ nullable: true, default: false })
  google_login: boolean

  @Prop({ nullable: true, default: false })
  facebook_login: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);