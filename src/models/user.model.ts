import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Followers, Follower, Followings, Following } from './follow.model';

export enum Role {
    ADMIN_ROLE = "ADMIN",
    USER_ROLE = "USER"
}

@Schema({ timestamps: true, versionKey: false })
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

    @Prop({ nullable: true })
    profile_photo: string

    @Prop({ nullable: true })
    biography: string

    @Prop({ type: MongooseSchema.Types.Mixed, nullable: true, default: {} })
    social_networks: {
        facebook?: string,
        instagram?: string,
        twitter?: string,
        youtube?: string,
        linkedin?: string
    }

    @Prop({ type: [Followers], autopopulate: true, nullable: true, default: [] })
    followers: Follower[]

    @Prop({ type: [Followings], autopopulate: true, nullable: true, default: [] })
    followings: Following[]

    @Prop({ nullable: true, default: false })
    google_login: boolean

    @Prop({ nullable: true, default: false })
    facebook_login: boolean

    @Prop({ nullable: false, type: MongooseSchema.Types.Array, default: [Role.USER_ROLE] })
    roles: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User);